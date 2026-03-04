import { NextResponse } from 'next/server';
import { scrapeAllSchemes } from '@/lib/scraper';

// This endpoint can be called by a cron job to refresh scheme data
export async function GET() {
    try {
        const startTime = Date.now();
        const schemes = await scrapeAllSchemes();
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        // TODO: Save schemes to database
        // const supabase = createAdminClient();
        // for (const scheme of schemes) {
        //   await supabase.from('schemes').upsert({
        //     title: scheme.title,
        //     description: scheme.description,
        //     ...scheme,
        //   }, { onConflict: 'title' });
        // }

        return NextResponse.json({
            success: true,
            total_schemes: schemes.length,
            duration_seconds: duration,
            sources: {
                well_known: schemes.filter((s) => s.source_name.includes('Official')).length,
                myscheme: schemes.filter((s) => s.source_name === 'MyScheme.gov.in').length,
                india_gov: schemes.filter((s) => s.source_name === 'India.gov.in').length,
                scholarships: schemes.filter((s) => s.source_name === 'National Scholarship Portal').length,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Scrape API error:', error);
        return NextResponse.json(
            { error: 'Scraping failed', details: String(error) },
            { status: 500 }
        );
    }
}
