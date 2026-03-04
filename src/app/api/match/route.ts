import { NextResponse } from 'next/server';
import { matchSchemes } from '@/lib/matching';
import type { QuestionnaireData } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const profile = body.profile as QuestionnaireData;

        if (!profile || !profile.full_name) {
            return NextResponse.json(
                { error: 'Invalid profile data' },
                { status: 400 }
            );
        }

        // Run matching engine
        const matches = await matchSchemes(profile, false);

        return NextResponse.json({
            total: matches.length,
            matches: matches.map((m) => ({
                title: m.scheme.title,
                description: m.scheme.description,
                ministry: m.scheme.ministry,
                eligibility: m.scheme.eligibility,
                benefits: m.scheme.benefits,
                application_url: m.scheme.application_url,
                source_url: m.scheme.source_url,
                source_name: m.scheme.source_name,
                category: m.scheme.category,
                documents_required: m.scheme.documents_required,
                match_score: m.matchScore,
                match_reasons: m.matchReasons,
                tags: m.scheme.tags,
            })),
        });
    } catch (error) {
        console.error('Matching error:', error);
        return NextResponse.json(
            { error: 'Failed to match schemes' },
            { status: 500 }
        );
    }
}
