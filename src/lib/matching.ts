// ============================================================
// SchemeIndia — Matching Engine
// ============================================================
// Matches user profiles against scraped government schemes
// Uses both rule-based matching and AI-enhanced scoring

import type { QuestionnaireData } from '@/lib/types';
import { type ScrapedScheme, scrapeAllSchemes, getWellKnownSchemes } from '@/lib/scraper';

export interface MatchedScheme {
    scheme: ScrapedScheme;
    matchScore: number;
    matchReasons: string[];
    relevantCategory: string;
}

// ----- Rule-based matching -----
function calculateRuleBasedScore(
    profile: QuestionnaireData,
    scheme: ScrapedScheme
): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];
    const tags = scheme.tags.map((t) => t.toLowerCase());
    const title = scheme.title.toLowerCase();
    const desc = scheme.description.toLowerCase();
    const eligibility = scheme.eligibility.map((e) => e.toLowerCase()).join(' ');

    // ----- Category matching -----
    if (profile.specific_needs.some((n) => tags.includes(n) || scheme.category.includes(n))) {
        score += 20;
        reasons.push('Matches your specific needs');
    }

    // ----- Gender matching -----
    if (profile.gender === 'female' && (tags.includes('women') || title.includes('mahila') || title.includes('woman') || desc.includes('women'))) {
        score += 15;
        reasons.push('Specifically for women beneficiaries');
    }

    // ----- Farmer matching -----
    if (profile.occupation === 'farmer') {
        if (tags.includes('farmer') || tags.includes('agriculture') || scheme.category === 'agriculture') {
            score += 20;
            reasons.push('Designed for farmers');
        }
        if (profile.land_ownership && (title.includes('kisan') || desc.includes('land'))) {
            score += 10;
            reasons.push('Relevant to your land ownership');
        }
    }

    // ----- BPL matching -----
    if (profile.bpl_card) {
        if (tags.includes('bpl') || eligibility.includes('bpl') || desc.includes('below poverty')) {
            score += 20;
            reasons.push('Available for BPL families');
        }
    }

    // ----- Income-based matching -----
    const incomeValue = parseInt(profile.annual_income);
    if (incomeValue && incomeValue <= 250000) {
        if (desc.includes('low income') || desc.includes('economically weaker') || eligibility.includes('ews')) {
            score += 15;
            reasons.push('Targets lower income families');
        }
        // Generic boost for BPL-eligible schemes
        score += 5;
    }

    // ----- Category (SC/ST/OBC/EWS) matching -----
    if (profile.category === 'sc' || profile.category === 'st') {
        if (tags.includes('sc-st') || eligibility.includes('sc') || eligibility.includes('st') || title.includes('stand-up')) {
            score += 15;
            reasons.push(`Specifically for ${profile.category.toUpperCase()} category`);
        }
    }
    if (profile.category === 'obc') {
        if (eligibility.includes('obc') || desc.includes('backward')) {
            score += 10;
            reasons.push('Available for OBC category');
        }
    }
    if (profile.category === 'ews') {
        if (eligibility.includes('ews') || desc.includes('economically weaker')) {
            score += 10;
            reasons.push('Available for EWS category');
        }
    }

    // ----- Education/Student matching -----
    if (profile.is_student) {
        if (tags.includes('scholarship') || tags.includes('education') || scheme.category === 'education') {
            score += 20;
            reasons.push('Relevant to students');
        }
    }

    // ----- Housing matching -----
    if (profile.house_type === 'kachha' || profile.house_type === 'homeless' || profile.house_type === 'rented') {
        if (scheme.category === 'housing' || tags.includes('housing')) {
            score += 15;
            reasons.push('Relevant to your housing situation');
        }
    }

    // ----- Disability matching -----
    if (profile.disability) {
        if (desc.includes('disability') || desc.includes('divyang') || eligibility.includes('disability')) {
            score += 15;
            reasons.push('Relevant for persons with disability');
        }
    }

    // ----- Health matching -----
    if (profile.has_chronic_illness || !profile.has_health_insurance) {
        if (scheme.category === 'health' || tags.includes('health') || tags.includes('insurance')) {
            score += 10;
            reasons.push('Relevant to your health needs');
        }
    }

    // ----- Senior citizen matching -----
    if (profile.has_senior_citizens) {
        if (tags.includes('pension') || scheme.category === 'pension' || desc.includes('senior')) {
            score += 10;
            reasons.push('Relevant for senior citizens in family');
        }
    }

    // ----- Business/Entrepreneur matching -----
    if (profile.occupation === 'business_owner' || profile.occupation === 'self_employed') {
        if (tags.includes('business') || tags.includes('entrepreneur') || tags.includes('msme') || scheme.category === 'business') {
            score += 15;
            reasons.push('Relevant to business owners');
        }
    }

    // ----- Employment matching -----
    if (profile.occupation === 'unemployed') {
        if (scheme.category === 'employment' || tags.includes('employment') || tags.includes('skill')) {
            score += 15;
            reasons.push('Employment assistance for job seekers');
        }
    }

    // ----- Single parent -----
    if (profile.is_single_parent) {
        if (desc.includes('single parent') || desc.includes('widow')) {
            score += 10;
            reasons.push('Support for single parents');
        }
    }

    // ----- Location matching -----
    if (profile.location_type === 'rural') {
        if (tags.includes('rural') || desc.includes('rural') || title.includes('gramin')) {
            score += 10;
            reasons.push('Available in rural areas');
        }
    } else if (profile.location_type === 'urban') {
        if (tags.includes('urban') || desc.includes('urban') || title.includes('urban')) {
            score += 10;
            reasons.push('Available in urban areas');
        }
    }

    // ----- Universal schemes (everyone qualifies) -----
    if (
        title.includes('suraksha bima') ||
        title.includes('jeevan jyoti') ||
        title.includes('atal pension')
    ) {
        score += 10;
        reasons.push('Available to all citizens');
    }

    // ----- Bank account bonus -----
    if (profile.has_bank_account && eligibility.includes('bank account')) {
        score += 5;
        reasons.push('You have required bank account');
    }

    // ----- Aadhaar bonus -----
    if (profile.has_aadhaar && eligibility.includes('aadhaar')) {
        score += 5;
        reasons.push('You have required Aadhaar card');
    }

    // Ensure minimum baseline for centrally operated schemes
    if (scheme.state === 'central' && score < 20) {
        score = Math.max(score, 15);
        if (reasons.length === 0) reasons.push('Central government scheme available to citizens');
    }

    // Cap at 100
    score = Math.min(score, 100);

    return { score, reasons };
}

// ----- Main matching function -----
export async function matchSchemes(
    profile: QuestionnaireData,
    useScrapedData: boolean = false
): Promise<MatchedScheme[]> {
    let schemes: ScrapedScheme[];

    if (useScrapedData) {
        schemes = await scrapeAllSchemes();
    } else {
        // Use well-known schemes for faster results
        schemes = getWellKnownSchemes();
    }

    const matches: MatchedScheme[] = schemes
        .map((scheme) => {
            const { score, reasons } = calculateRuleBasedScore(profile, scheme);
            return {
                scheme,
                matchScore: score,
                matchReasons: reasons,
                relevantCategory: scheme.category,
            };
        })
        .filter((m) => m.matchScore >= 15)
        .sort((a, b) => b.matchScore - a.matchScore);

    return matches;
}
