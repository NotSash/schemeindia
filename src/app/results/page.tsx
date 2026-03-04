'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ExternalLink,
    Download,
    FileText,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    Search,
    Filter,
    Star,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { matchSchemes, type MatchedScheme } from '@/lib/matching';
import type { QuestionnaireData } from '@/lib/types';
import { getMatchScoreColor } from '@/lib/utils';

export default function ResultsPage() {
    const [matches, setMatches] = useState<MatchedScheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function loadResults() {
            try {
                const saved = localStorage.getItem('schemeindia_questionnaire');
                if (saved) {
                    const profile = JSON.parse(saved) as QuestionnaireData;
                    setUserName(profile.full_name || '');
                    const results = await matchSchemes(profile, false);
                    setMatches(results);
                }
            } catch (error) {
                console.error('Failed to load results:', error);
            } finally {
                setLoading(false);
            }
        }
        loadResults();
    }, []);

    const categories = ['all', ...new Set(matches.map((m) => m.relevantCategory))];

    const filteredMatches = matches.filter((m) => {
        const matchesSearch =
            searchQuery === '' ||
            m.scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || m.relevantCategory === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const totalBenefits = matches.reduce((sum, m) => {
        const amounts = m.scheme.benefits.match(/₹[\d,]+/g);
        if (amounts) {
            const numVal = parseInt(amounts[0].replace(/[₹,]/g, ''));
            return sum + (isNaN(numVal) ? 0 : numVal);
        }
        return sum;
    }, 0);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-lg font-medium">Analyzing your profile...</p>
                    <p className="text-sm text-muted-foreground">Finding schemes you&apos;re eligible for</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="text-sm text-brand-blue hover:underline flex items-center gap-1 mb-4">
                        <ArrowLeft className="h-3 w-3" /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        Your Scheme Report
                    </h1>
                    <p className="text-muted-foreground">
                        {userName ? `Hi ${userName}, we` : 'We'} found <strong className="text-brand-green">{matches.length} schemes</strong> you may be eligible for
                        {totalBenefits > 0 && (
                            <> with potential benefits worth <strong className="text-brand-green">₹{totalBenefits.toLocaleString('en-IN')}</strong></>
                        )}.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 text-center">
                            <p className="text-xl sm:text-2xl font-bold text-brand-blue">{matches.length}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">Schemes Found</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 text-center">
                            <p className="text-xl sm:text-2xl font-bold text-brand-green">{matches.filter((m) => m.matchScore >= 60).length}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">High Match</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 text-center">
                            <p className="text-xl sm:text-2xl font-bold text-brand-saffron">{categories.length - 1}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">Categories</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search schemes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Download PDF */}
                <div className="flex justify-end mb-4">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download PDF Report
                    </Button>
                </div>

                {/* Scheme Cards */}
                <div className="space-y-4">
                    {filteredMatches.map((match, index) => {
                        const isExpanded = expandedIndex === index;
                        const scoreColor = getMatchScoreColor(match.matchScore);

                        return (
                            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <CardContent className="p-0">
                                    {/* Header */}
                                    <button
                                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        className="w-full p-5 text-left flex items-start gap-4"
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <div className={`text-lg font-bold ${scoreColor}`}>
                                                {match.matchScore}%
                                            </div>
                                            <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${match.matchScore >= 70 ? 'bg-brand-green' : match.matchScore >= 40 ? 'bg-yellow-400' : 'bg-orange-400'}`}
                                                    style={{ width: `${match.matchScore}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold text-sm sm:text-base leading-tight">
                                                    {match.scheme.title}
                                                </h3>
                                                {isExpanded ? (
                                                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                                <Badge variant="secondary" className="text-xs">
                                                    {match.relevantCategory.charAt(0).toUpperCase() + match.relevantCategory.slice(1)}
                                                </Badge>
                                                {match.scheme.ministry && (
                                                    <span className="text-xs text-muted-foreground">{match.scheme.ministry}</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                {match.scheme.description}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-5 pb-5 border-t bg-muted/20">
                                            <div className="pt-4 space-y-4">
                                                {/* Benefits */}
                                                {match.scheme.benefits && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                                                            <Star className="h-4 w-4 text-brand-saffron" /> Benefits
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">{match.scheme.benefits}</p>
                                                    </div>
                                                )}

                                                {/* Eligibility */}
                                                {match.scheme.eligibility.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                                                            <CheckCircle2 className="h-4 w-4 text-brand-green" /> Eligibility Criteria
                                                        </h4>
                                                        <ul className="space-y-1">
                                                            {match.scheme.eligibility.map((e, i) => (
                                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                                    <span className="text-brand-green mt-1">•</span> {e}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Documents Required */}
                                                {match.scheme.documents_required.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                                                            <FileText className="h-4 w-4 text-brand-blue" /> Documents Required
                                                        </h4>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {match.scheme.documents_required.map((doc, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs">{doc}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Why You Match */}
                                                {match.matchReasons.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold mb-1">Why You Match</h4>
                                                        <ul className="space-y-1">
                                                            {match.matchReasons.map((r, i) => (
                                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green shrink-0 mt-0.5" /> {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Apply Now */}
                                                <div className="flex items-center gap-3 pt-2">
                                                    <a href={match.scheme.application_url} target="_blank" rel="noopener noreferrer">
                                                        <Button className="bg-brand-saffron hover:bg-brand-saffron/90 text-white" size="sm">
                                                            Apply Now <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                                                        </Button>
                                                    </a>
                                                    <a href={match.scheme.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue hover:underline">
                                                        Source: {match.scheme.source_name}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {filteredMatches.length === 0 && (
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-12 text-center">
                            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </CardContent>
                    </Card>
                )}

                {/* Disclaimer */}
                <Card className="mt-8 border-brand-blue/20 bg-brand-blue/5">
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong>Disclaimer:</strong> The information shown is based on publicly available government data and AI-based matching.
                            Eligibility is indicative and not guaranteed. Please verify all details from official government websites before applying.
                            SchemeIndia is not affiliated with the Government of India.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
