// ============================================================
// SchemeIndia — Government Scheme Scraper
// ============================================================
// Scrapes scheme data from official government websites
// Sources: myscheme.gov.in, india.gov.in, scholarships.gov.in

import * as cheerio from 'cheerio';

export interface ScrapedScheme {
    title: string;
    description: string;
    ministry: string;
    eligibility: string[];
    benefits: string;
    application_url: string;
    source_url: string;
    source_name: string;
    category: string;
    state: string;
    last_updated: string;
    documents_required: string[];
    tags: string[];
}

// ----- MyScheme.gov.in Scraper -----
export async function scrapeMyScheme(): Promise<ScrapedScheme[]> {
    const schemes: ScrapedScheme[] = [];

    try {
        // Fetch scheme listing pages
        const categories = [
            'agriculture', 'education', 'health', 'housing', 'finance',
            'social-welfare', 'women-and-child', 'employment', 'science-and-technology',
        ];

        for (const category of categories) {
            try {
                const url = `https://www.myscheme.gov.in/schemes?category=${category}`;
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; SchemeIndiaBot/1.0)',
                    },
                    signal: AbortSignal.timeout(10000),
                });

                if (!response.ok) continue;

                const html = await response.text();
                const $ = cheerio.load(html);

                // Parse scheme cards (structure may vary, this is best-effort)
                $('[class*="scheme-card"], [class*="card"], .scheme-item').each((_i, el) => {
                    const title = $(el).find('h2, h3, h4, [class*="title"]').first().text().trim();
                    const desc = $(el).find('p, [class*="description"], [class*="desc"]').first().text().trim();
                    const link = $(el).find('a').first().attr('href') || '';

                    if (title && title.length > 5) {
                        schemes.push({
                            title,
                            description: desc || 'Details available on official website.',
                            ministry: '',
                            eligibility: [],
                            benefits: '',
                            application_url: link.startsWith('http') ? link : `https://www.myscheme.gov.in${link}`,
                            source_url: url,
                            source_name: 'MyScheme.gov.in',
                            category,
                            state: 'central',
                            last_updated: new Date().toISOString(),
                            documents_required: [],
                            tags: [category],
                        });
                    }
                });
            } catch {
                console.warn(`Failed to scrape myscheme category: ${category}`);
            }
        }
    } catch (error) {
        console.error('MyScheme scraper error:', error);
    }

    return schemes;
}

// ----- India.gov.in Scraper -----
export async function scrapeIndiaGov(): Promise<ScrapedScheme[]> {
    const schemes: ScrapedScheme[] = [];

    try {
        const url = 'https://www.india.gov.in/my-government/schemes';
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SchemeIndiaBot/1.0)',
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) return schemes;

        const html = await response.text();
        const $ = cheerio.load(html);

        $('[class*="view-content"] .views-row, .scheme-item, [class*="listing"] li').each((_i, el) => {
            const title = $(el).find('a, h3, h4').first().text().trim();
            const link = $(el).find('a').first().attr('href') || '';
            const desc = $(el).find('p, .description').first().text().trim();

            if (title && title.length > 5) {
                schemes.push({
                    title,
                    description: desc || 'Details available on official website.',
                    ministry: '',
                    eligibility: [],
                    benefits: '',
                    application_url: link.startsWith('http') ? link : `https://www.india.gov.in${link}`,
                    source_url: url,
                    source_name: 'India.gov.in',
                    category: 'general',
                    state: 'central',
                    last_updated: new Date().toISOString(),
                    documents_required: [],
                    tags: [],
                });
            }
        });
    } catch (error) {
        console.error('India.gov.in scraper error:', error);
    }

    return schemes;
}

// ----- National Scholarship Portal Scraper -----
export async function scrapeScholarships(): Promise<ScrapedScheme[]> {
    const schemes: ScrapedScheme[] = [];

    try {
        const url = 'https://scholarships.gov.in/';
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SchemeIndiaBot/1.0)',
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) return schemes;

        const html = await response.text();
        const $ = cheerio.load(html);

        $('[class*="scholarship"], [class*="scheme"], .card, table tr').each((_i, el) => {
            const title = $(el).find('a, h3, h4, td:first-child').first().text().trim();
            const link = $(el).find('a').first().attr('href') || '';

            if (title && title.length > 5 && !title.includes('Login') && !title.includes('Home')) {
                schemes.push({
                    title,
                    description: 'Scholarship scheme. Apply through National Scholarship Portal.',
                    ministry: 'Ministry of Education',
                    eligibility: [],
                    benefits: '',
                    application_url: link.startsWith('http') ? link : `https://scholarships.gov.in${link}`,
                    source_url: url,
                    source_name: 'National Scholarship Portal',
                    category: 'education',
                    state: 'central',
                    last_updated: new Date().toISOString(),
                    documents_required: [],
                    tags: ['scholarship', 'education'],
                });
            }
        });
    } catch (error) {
        console.error('Scholarship scraper error:', error);
    }

    return schemes;
}

// ----- Fallback: Well-known schemes -----
// These are manually curated known schemes to ensure results even if scraping fails
export function getWellKnownSchemes(): ScrapedScheme[] {
    return [
        {
            title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
            description: 'Financial assistance of ₹6,000 per year to eligible farmer families, paid in three equal installments of ₹2,000 each directly to their bank accounts.',
            ministry: 'Ministry of Agriculture & Farmers Welfare',
            eligibility: ['All landholding farmer families', 'Subject to certain exclusion criteria'],
            benefits: '₹6,000 per year in 3 installments',
            application_url: 'https://pmkisan.gov.in/',
            source_url: 'https://pmkisan.gov.in/',
            source_name: 'PM-KISAN Official',
            category: 'agriculture',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
            tags: ['farmer', 'agriculture', 'direct-benefit'],
        },
        {
            title: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PMJAY)',
            description: 'Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary hospitalization to eligible families.',
            ministry: 'Ministry of Health & Family Welfare',
            eligibility: ['Families identified in SECC database', 'BPL families', 'No income cap for rural deprived households'],
            benefits: '₹5 lakh health insurance per family per year',
            application_url: 'https://pmjay.gov.in/',
            source_url: 'https://pmjay.gov.in/',
            source_name: 'PMJAY Official',
            category: 'health',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
            tags: ['health', 'insurance', 'hospital'],
        },
        {
            title: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
            description: 'Financial assistance for construction of pucca houses for eligible rural households. ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas.',
            ministry: 'Ministry of Rural Development',
            eligibility: ['Houseless families', 'Families living in dilapidated houses', 'Families in kutcha house', 'Rural areas'],
            benefits: '₹1.20 lakh – ₹1.30 lakh for house construction',
            application_url: 'https://pmayg.nic.in/',
            source_url: 'https://pmayg.nic.in/',
            source_name: 'PMAY-G Official',
            category: 'housing',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'BPL Certificate', 'Land Documents', 'Bank Account'],
            tags: ['housing', 'rural', 'construction'],
        },
        {
            title: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
            description: 'Affordable housing for urban poor with interest subsidy on home loans. Subsidy ranges from ₹2.35 lakh to ₹2.67 lakh based on income category.',
            ministry: 'Ministry of Housing and Urban Affairs',
            eligibility: ['EWS/LIG/MIG families in urban areas', 'No pucca house in family', 'Income-based categories'],
            benefits: 'Interest subsidy up to ₹2.67 lakh on home loans',
            application_url: 'https://pmaymis.gov.in/',
            source_url: 'https://pmaymis.gov.in/',
            source_name: 'PMAY-U Official',
            category: 'housing',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Income Certificate', 'Bank Statement', 'Property Documents'],
            tags: ['housing', 'urban', 'loan-subsidy'],
        },
        {
            title: 'PM Ujjwala Yojana 2.0',
            description: 'Free LPG connections to women of BPL families along with a free refill and hotplate. Aims to make clean cooking fuel available.',
            ministry: 'Ministry of Petroleum & Natural Gas',
            eligibility: ['Women of BPL households', 'No existing LPG connection', 'Adult women (18+ years)'],
            benefits: 'Free LPG connection + first refill + hotplate',
            application_url: 'https://www.pmuy.gov.in/',
            source_url: 'https://www.pmuy.gov.in/',
            source_name: 'PMUY Official',
            category: 'social-welfare',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'BPL Card', 'Bank Account', 'Passport Size Photo'],
            tags: ['women', 'lpg', 'bpl', 'cooking'],
        },
        {
            title: 'Sukanya Samriddhi Yojana',
            description: 'A small savings scheme for the girl child, offering high interest rate and tax benefits. Deposit can be made until girl turns 15, maturity at age 21.',
            ministry: 'Ministry of Finance',
            eligibility: ['Parents/guardians of girl child below 10 years', 'Maximum 2 accounts (one per girl child)'],
            benefits: 'High interest rate (currently ~8%), Tax exempt under 80C',
            application_url: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
            source_url: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
            source_name: 'India.gov.in',
            category: 'finance',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Girl Child Birth Certificate', 'Parent Aadhaar', 'Address Proof'],
            tags: ['girl-child', 'savings', 'investment', 'women'],
        },
        {
            title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
            description: 'Guarantees 100 days of wage employment per year to rural households whose adult members volunteer to do unskilled manual work.',
            ministry: 'Ministry of Rural Development',
            eligibility: ['Adult members of rural households', 'Willing to do unskilled manual work', 'Must apply for job card'],
            benefits: '100 days guaranteed employment at minimum wages',
            application_url: 'https://nrega.nic.in/',
            source_url: 'https://nrega.nic.in/',
            source_name: 'MGNREGA Official',
            category: 'employment',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Job Card', 'Bank Account'],
            tags: ['employment', 'rural', 'manual-labour'],
        },
        {
            title: 'Pradhan Mantri Mudra Yojana (PMMY)',
            description: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises. Three categories: Shishu (up to ₹50,000), Kishore (₹50,001-₹5 lakh), Tarun (₹5-10 lakh).',
            ministry: 'Ministry of Finance',
            eligibility: ['Non-farm income generating activities', 'Small/micro enterprises', 'Manufacturing, trading, services sector'],
            benefits: 'Collateral-free loans up to ₹10 lakh',
            application_url: 'https://www.mudra.org.in/',
            source_url: 'https://www.mudra.org.in/',
            source_name: 'MUDRA Official',
            category: 'business',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Address Proof'],
            tags: ['business', 'loan', 'entrepreneur', 'msme'],
        },
        {
            title: 'Atal Pension Yojana (APY)',
            description: 'Pension scheme for unorganized sector workers. Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60, based on contribution.',
            ministry: 'Ministry of Finance',
            eligibility: ['Age 18-40 years', 'Must have bank account', 'Not an income tax payer', 'Unorganized sector workers'],
            benefits: 'Guaranteed monthly pension of ₹1,000-₹5,000 after 60',
            application_url: 'https://www.npscra.nsdl.co.in/scheme-details.php',
            source_url: 'https://jansuraksha.gov.in/',
            source_name: 'Jan Suraksha',
            category: 'pension',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
            tags: ['pension', 'unorganized', 'retirement'],
        },
        {
            title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
            description: 'Life insurance cover of ₹2 lakh at a premium of ₹436 per year, renewable annually. Available to all bank account holders aged 18-50.',
            ministry: 'Ministry of Finance',
            eligibility: ['Age 18-50 years', 'Must have bank account with auto-debit facility'],
            benefits: '₹2 lakh life insurance cover for ₹436/year',
            application_url: 'https://jansuraksha.gov.in/',
            source_url: 'https://jansuraksha.gov.in/',
            source_name: 'Jan Suraksha',
            category: 'insurance',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Bank Account', 'Nominee Details'],
            tags: ['insurance', 'life-insurance'],
        },
        {
            title: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
            description: 'Accidental insurance cover of ₹2 lakh at a premium of just ₹20 per year. Covers accidental death and permanent disability.',
            ministry: 'Ministry of Finance',
            eligibility: ['Age 18-70 years', 'Must have bank account'],
            benefits: '₹2 lakh accident insurance for ₹20/year',
            application_url: 'https://jansuraksha.gov.in/',
            source_url: 'https://jansuraksha.gov.in/',
            source_name: 'Jan Suraksha',
            category: 'insurance',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Bank Account'],
            tags: ['insurance', 'accident', 'affordable'],
        },
        {
            title: 'National Family Benefit Scheme (NFBS)',
            description: 'Lump sum assistance of ₹20,000 to BPL families in the event of death of the primary breadwinner. One-time grant.',
            ministry: 'Ministry of Rural Development',
            eligibility: ['BPL family', 'Death of primary breadwinner (18-60 years)', 'Applied within 1 year of death'],
            benefits: '₹20,000 lump sum grant',
            application_url: 'https://nsap.nic.in/',
            source_url: 'https://nsap.nic.in/',
            source_name: 'NSAP Official',
            category: 'social-welfare',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Death Certificate', 'BPL Card', 'Aadhaar Card', 'Bank Account'],
            tags: ['death-benefit', 'bpl', 'social-welfare'],
        },
        {
            title: 'Stand-Up India Scheme',
            description: 'Bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch for setting up greenfield enterprises.',
            ministry: 'Ministry of Finance',
            eligibility: ['SC/ST entrepreneurs', 'Women entrepreneurs', 'Age 18+ years', 'Greenfield enterprise'],
            benefits: 'Loans from ₹10 lakh to ₹1 crore',
            application_url: 'https://www.standupmitra.in/',
            source_url: 'https://www.standupmitra.in/',
            source_name: 'Stand Up India Official',
            category: 'business',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'PAN Card', 'Caste Certificate', 'Business Plan'],
            tags: ['sc-st', 'women', 'business', 'entrepreneur'],
        },
        {
            title: 'PM Vishwakarma Scheme',
            description: 'Support for traditional artisans and craftspeople with recognition, skill upgradation, toolkit incentive, credit support, and digital empowerment.',
            ministry: 'Ministry of Micro, Small and Medium Enterprises',
            eligibility: ['Traditional artisans and craftspeople', 'Working with hands and tools', '18 registered trades'],
            benefits: 'Toolkit incentive ₹15,000 + loans up to ₹3 lakh',
            application_url: 'https://pmvishwakarma.gov.in/',
            source_url: 'https://pmvishwakarma.gov.in/',
            source_name: 'PM Vishwakarma Official',
            category: 'employment',
            state: 'central',
            last_updated: new Date().toISOString(),
            documents_required: ['Aadhaar Card', 'Bank Account', 'Proof of Trade'],
            tags: ['artisan', 'craftsman', 'skill', 'msme'],
        },
    ];
}

// ----- Main scraping function -----
export async function scrapeAllSchemes(): Promise<ScrapedScheme[]> {
    const allSchemes: ScrapedScheme[] = [];

    // Always include well-known schemes as fallback
    const wellKnown = getWellKnownSchemes();
    allSchemes.push(...wellKnown);

    // Try scraping (graceful failure)
    try {
        const [mySchemes, indiaGov, scholarships] = await Promise.allSettled([
            scrapeMyScheme(),
            scrapeIndiaGov(),
            scrapeScholarships(),
        ]);

        if (mySchemes.status === 'fulfilled') allSchemes.push(...mySchemes.value);
        if (indiaGov.status === 'fulfilled') allSchemes.push(...indiaGov.value);
        if (scholarships.status === 'fulfilled') allSchemes.push(...scholarships.value);
    } catch (error) {
        console.error('Scraping failed, using fallback schemes only:', error);
    }

    // Deduplicate by title
    const seen = new Set<string>();
    return allSchemes.filter((scheme) => {
        const key = scheme.title.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
