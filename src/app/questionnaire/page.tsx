'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    ArrowLeft,
    ArrowRight,
    User,
    MapPin,
    Users,
    GraduationCap,
    Briefcase,
    Heart,
    Home,
    Target,
    CheckCircle2,
} from 'lucide-react';
import {
    STATES_AND_UTS,
    DISTRICTS,
    RELIGIONS,
    OCCUPATION_LABELS,
    EDUCATION_LABELS,
    INCOME_RANGES,
    SPECIFIC_NEEDS_OPTIONS,
    DISABILITY_TYPES,
    RATION_CARD_LABELS,
} from '@/lib/constants';
import type { QuestionnaireData, SpecificNeed } from '@/lib/types';

const STEPS = [
    { title: 'Personal Information', icon: User },
    { title: 'Location', icon: MapPin },
    { title: 'Social Category & Identity', icon: Users },
    { title: 'Education', icon: GraduationCap },
    { title: 'Occupation & Income', icon: Briefcase },
    { title: 'Family Details', icon: Users },
    { title: 'Health & Disability', icon: Heart },
    { title: 'Housing & Property', icon: Home },
    { title: 'Specific Needs', icon: Target },
    { title: 'Review & Submit', icon: CheckCircle2 },
];

const STORAGE_KEY = 'schemeindia_questionnaire';

const DEFAULT_DATA: QuestionnaireData = {
    full_name: '', date_of_birth: '', gender: '', marital_status: '', religion: '', minority_status: null,
    state: '', district: '', location_type: '', pin_code: '',
    category: '', bpl_card: null, ration_card_type: '', has_aadhaar: null, has_bank_account: null, ex_serviceman: null,
    education_level: '', is_student: null, student_level: '', institution_type: '',
    occupation: '', land_ownership: null, land_area_acres: '', business_type: '', business_registered: null, employer_type: '', annual_income: '',
    number_of_dependents: '', is_single_parent: null, number_of_children: '0', children_details: [], has_senior_citizens: null, senior_citizen_count: '',
    disability: null, disability_who: '', disability_type: '', disability_percentage: '', has_chronic_illness: null, has_health_insurance: null,
    house_type: '', land_ownership_general: null, land_area_general: '',
    specific_needs: [], other_needs: '',
    currentStep: 0, isComplete: false,
};

function RadioOption({ name, value, label, checked, onChange }: {
    name: string; value: string; label: string; checked: boolean; onChange: (v: string) => void;
}) {
    return (
        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checked ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue' : 'border-border hover:border-brand-blue/30 hover:bg-muted/50'
            }`}>
            <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${checked ? 'border-brand-blue' : 'border-muted-foreground/40'
                }`}>
                {checked && <div className="h-2 w-2 rounded-full bg-brand-blue" />}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </label>
    );
}

function SelectField({ id, label, value, onChange, options, helper }: {
    id: string; label: string; value: string; onChange: (v: string) => void;
    options: { value: string; label: string }[]; helper?: string;
}) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            {helper && <p className="text-xs text-muted-foreground mt-0.5">{helper}</p>}
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <option value="">Select...</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

// Validate required fields for each step
function validateStep(step: number, data: QuestionnaireData): string | null {
    switch (step) {
        case 0: // Personal
            if (!data.full_name.trim()) return 'Please enter your full name.';
            if (!data.date_of_birth) return 'Please enter your date of birth.';
            if (!data.gender) return 'Please select your gender.';
            if (!data.marital_status) return 'Please select your marital status.';
            if (!data.religion) return 'Please select your religion.';
            if (data.minority_status === null) return 'Please indicate if you belong to a minority community.';
            return null;
        case 1: // Location
            if (!data.state) return 'Please select your state.';
            if (!data.district) return 'Please select your district.';
            if (!data.location_type) return 'Please select your area type.';
            return null;
        case 2: // Social Category
            if (!data.category) return 'Please select your category.';
            if (data.bpl_card === null) return 'Please indicate if you have a BPL card.';
            if (!data.ration_card_type) return 'Please select your ration card type.';
            if (data.has_aadhaar === null) return 'Please indicate if you have an Aadhaar card.';
            if (data.has_bank_account === null) return 'Please indicate if you have a bank account.';
            if (data.ex_serviceman === null) return 'Please indicate if you are an ex-serviceman.';
            return null;
        case 3: // Education
            if (!data.education_level) return 'Please select your education level.';
            if (data.is_student === null) return 'Please indicate if you are a student.';
            return null;
        case 4: // Occupation
            if (!data.occupation) return 'Please select your occupation.';
            if (!data.annual_income) return 'Please select your annual income range.';
            return null;
        case 5: // Family
            if (!data.number_of_dependents) return 'Please enter the number of family members.';
            if (data.is_single_parent === null) return 'Please indicate if you are a single parent.';
            if (data.has_senior_citizens === null) return 'Please indicate if you have senior citizens in your family.';
            return null;
        case 6: // Health
            if (data.disability === null) return 'Please indicate if any family member has a disability.';
            if (data.has_chronic_illness === null) return 'Please indicate if any family member has a chronic illness.';
            return null;
        case 7: // Housing
            if (!data.house_type) return 'Please select your housing status.';
            if (data.land_ownership_general === null) return 'Please indicate if you own any land.';
            return null;
        case 8: // Needs
            if (data.specific_needs.length === 0) return 'Please select at least one area of need.';
            return null;
        default:
            return null;
    }
}

export default function QuestionnairePage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<QuestionnaireData>(DEFAULT_DATA);
    const [stepError, setStepError] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    // Load saved data
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as QuestionnaireData;
                setData(parsed);
                setStep(parsed.currentStep || 0);
            } catch { /* ignore */ }
        }
    }, []);

    // Auto-save
    const saveData = useCallback((newData: QuestionnaireData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }, []);

    const update = (fields: Partial<QuestionnaireData>) => {
        const newData = { ...data, ...fields };
        setData(newData);
        saveData(newData);
    };

    const next = () => {
        const error = validateStep(step, data);
        if (error) {
            setStepError(error);
            window.scrollTo(0, 0);
            return;
        }
        setStepError(null);
        const newStep = Math.min(step + 1, 9);
        setStep(newStep);
        update({ currentStep: newStep });
        window.scrollTo(0, 0);
    };

    const prev = () => {
        setStepError(null);
        const newStep = Math.max(step - 1, 0);
        setStep(newStep);
        update({ currentStep: newStep });
        window.scrollTo(0, 0);
    };

    const goToStep = (s: number) => {
        setStepError(null);
        setStep(s);
        update({ currentStep: s });
        window.scrollTo(0, 0);
    };

    const handleSubmit = () => {
        if (!confirmed) {
            setStepError('Please confirm the checkbox above before submitting.');
            return;
        }
        setStepError(null);
        update({ isComplete: true });
        router.push('/payment');
    };

    const progress = ((step + 1) / 10) * 100;

    const districtOptions = data.state ? (DISTRICTS[data.state] || []).map((d) => ({ value: d, label: d })) : [];

    return (
        <div className="py-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-brand-blue">
                            Step {step + 1} of 10: {STEPS[step].title}
                        </span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-saffron rounded-full progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {/* Step indicators */}
                    <div className="flex justify-between mt-3 overflow-x-auto scroll-hide gap-1 sm:gap-0 pb-1">
                        {STEPS.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => goToStep(i)}
                                className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${i === step
                                    ? 'bg-brand-saffron text-white shadow-md'
                                    : i < step
                                        ? 'bg-brand-green text-white'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                                title={s.title}
                            >
                                {i < step ? '✓' : i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 sm:p-8">
                        {/* Validation Error */}
                        {stepError && (
                            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-5 flex items-center gap-2">
                                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {stepError}
                            </div>
                        )}
                        {/* Step 1: Personal */}
                        {step === 0 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><User className="h-5 w-5 text-brand-blue" /> Personal Information</h2>
                                <div>
                                    <Label htmlFor="full_name">Full Name *</Label>
                                    <Input id="full_name" value={data.full_name} onChange={(e) => update({ full_name: e.target.value })} placeholder="Enter your full name as per Aadhaar" className="mt-1.5" />
                                </div>
                                <div>
                                    <Label htmlFor="dob">Date of Birth *</Label>
                                    <Input id="dob" type="date" value={data.date_of_birth} onChange={(e) => update({ date_of_birth: e.target.value })} className="mt-1.5" />
                                </div>
                                <div>
                                    <Label>Gender *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        {[{ v: 'male', l: 'Male' }, { v: 'female', l: 'Female' }, { v: 'transgender', l: 'Transgender' }, { v: 'other', l: 'Other' }].map((g) => (
                                            <RadioOption key={g.v} name="gender" value={g.v} label={g.l} checked={data.gender === g.v} onChange={(v) => update({ gender: v as QuestionnaireData['gender'] })} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>Marital Status *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        {[{ v: 'single', l: 'Single' }, { v: 'married', l: 'Married' }, { v: 'divorced', l: 'Divorced' }, { v: 'widowed', l: 'Widowed' }].map((m) => (
                                            <RadioOption key={m.v} name="marital" value={m.v} label={m.l} checked={data.marital_status === m.v} onChange={(v) => update({ marital_status: v as QuestionnaireData['marital_status'] })} />
                                        ))}
                                    </div>
                                </div>
                                <SelectField id="religion" label="Religion *" value={data.religion} onChange={(v) => update({ religion: v })} options={RELIGIONS.map((r) => ({ value: r, label: r }))} />
                                <div>
                                    <Label>Do you belong to a minority community? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="minority" value="yes" label="Yes" checked={data.minority_status === true} onChange={() => update({ minority_status: true })} />
                                        <RadioOption name="minority" value="no" label="No" checked={data.minority_status === false} onChange={() => update({ minority_status: false })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {step === 1 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-brand-blue" /> Location</h2>
                                <SelectField id="state" label="State / Union Territory *" value={data.state} onChange={(v) => update({ state: v, district: '' })} options={STATES_AND_UTS.map((s) => ({ value: s, label: s }))} />
                                <SelectField id="district" label="District *" value={data.district} onChange={(v) => update({ district: v })} options={districtOptions} helper={data.state ? '' : 'Please select a state first'} />
                                <div>
                                    <Label>Area Type *</Label>
                                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                                        {[{ v: 'rural', l: 'Rural' }, { v: 'urban', l: 'Urban' }, { v: 'semi_urban', l: 'Semi-Urban' }].map((a) => (
                                            <RadioOption key={a.v} name="location_type" value={a.v} label={a.l} checked={data.location_type === a.v} onChange={(v) => update({ location_type: v as QuestionnaireData['location_type'] })} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="pin_code">PIN Code (optional)</Label>
                                    <Input id="pin_code" value={data.pin_code} onChange={(e) => update({ pin_code: e.target.value })} placeholder="6-digit PIN code" maxLength={6} className="mt-1.5" />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Social Category */}
                        {step === 2 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Users className="h-5 w-5 text-brand-blue" /> Social Category & Identity</h2>
                                <div>
                                    <Label>Category *</Label>
                                    <p className="text-xs text-muted-foreground mt-0.5">Based on your caste certificate or EWS certificate</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
                                        {[{ v: 'general', l: 'General' }, { v: 'obc', l: 'OBC' }, { v: 'sc', l: 'SC' }, { v: 'st', l: 'ST' }, { v: 'ews', l: 'EWS' }].map((c) => (
                                            <RadioOption key={c.v} name="category" value={c.v} label={c.l} checked={data.category === c.v} onChange={(v) => update({ category: v as QuestionnaireData['category'] })} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>Do you have a BPL (Below Poverty Line) card? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="bpl" value="yes" label="Yes" checked={data.bpl_card === true} onChange={() => update({ bpl_card: true })} />
                                        <RadioOption name="bpl" value="no" label="No" checked={data.bpl_card === false} onChange={() => update({ bpl_card: false })} />
                                    </div>
                                </div>
                                <SelectField id="ration_card" label="Ration Card Type *" value={data.ration_card_type} onChange={(v) => update({ ration_card_type: v as QuestionnaireData['ration_card_type'] })} options={Object.entries(RATION_CARD_LABELS).map(([k, v]) => ({ value: k, label: v }))} />
                                <div>
                                    <Label>Do you have an Aadhaar Card? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="aadhaar" value="yes" label="Yes" checked={data.has_aadhaar === true} onChange={() => update({ has_aadhaar: true })} />
                                        <RadioOption name="aadhaar" value="no" label="No" checked={data.has_aadhaar === false} onChange={() => update({ has_aadhaar: false })} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Do you have a bank account? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="bank" value="yes" label="Yes" checked={data.has_bank_account === true} onChange={() => update({ has_bank_account: true })} />
                                        <RadioOption name="bank" value="no" label="No" checked={data.has_bank_account === false} onChange={() => update({ has_bank_account: false })} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Are you an Ex-Serviceman or dependent of defence personnel? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="exservice" value="yes" label="Yes" checked={data.ex_serviceman === true} onChange={() => update({ ex_serviceman: true })} />
                                        <RadioOption name="exservice" value="no" label="No" checked={data.ex_serviceman === false} onChange={() => update({ ex_serviceman: false })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Education */}
                        {step === 3 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><GraduationCap className="h-5 w-5 text-brand-blue" /> Education</h2>
                                <SelectField id="education" label="Highest Education Level *" value={data.education_level} onChange={(v) => update({ education_level: v as QuestionnaireData['education_level'] })} options={Object.entries(EDUCATION_LABELS).map(([k, v]) => ({ value: k, label: v }))} />
                                <div>
                                    <Label>Are you currently a student? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="student" value="yes" label="Yes" checked={data.is_student === true} onChange={() => update({ is_student: true })} />
                                        <RadioOption name="student" value="no" label="No" checked={data.is_student === false} onChange={() => update({ is_student: false })} />
                                    </div>
                                </div>
                                {data.is_student && (
                                    <>
                                        <SelectField id="student_level" label="What level are you studying?" value={data.student_level} onChange={(v) => update({ student_level: v })} options={Object.entries(EDUCATION_LABELS).map(([k, v]) => ({ value: k, label: v }))} />
                                        <div>
                                            <Label>Institution Type</Label>
                                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                                                <RadioOption name="inst_type" value="government" label="Government" checked={data.institution_type === 'government'} onChange={(v) => update({ institution_type: v })} />
                                                <RadioOption name="inst_type" value="private" label="Private" checked={data.institution_type === 'private'} onChange={(v) => update({ institution_type: v })} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Step 5: Occupation & Income */}
                        {step === 4 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase className="h-5 w-5 text-brand-blue" /> Occupation & Income</h2>
                                <SelectField id="occupation" label="Current Occupation *" value={data.occupation} onChange={(v) => update({ occupation: v as QuestionnaireData['occupation'] })} options={Object.entries(OCCUPATION_LABELS).map(([k, v]) => ({ value: k, label: v }))} />
                                {data.occupation === 'farmer' && (
                                    <>
                                        <div>
                                            <Label>Do you own agricultural land?</Label>
                                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                                                <RadioOption name="farm_land" value="yes" label="Yes" checked={data.land_ownership === true} onChange={() => update({ land_ownership: true })} />
                                                <RadioOption name="farm_land" value="no" label="No" checked={data.land_ownership === false} onChange={() => update({ land_ownership: false })} />
                                            </div>
                                        </div>
                                        {data.land_ownership && (
                                            <div>
                                                <Label htmlFor="land_acres">How many acres?</Label>
                                                <Input id="land_acres" type="number" step="0.5" value={data.land_area_acres} onChange={(e) => update({ land_area_acres: e.target.value })} placeholder="e.g., 2.5" className="mt-1.5" />
                                            </div>
                                        )}
                                    </>
                                )}
                                {data.occupation === 'business_owner' && (
                                    <>
                                        <div>
                                            <Label htmlFor="biz_type">Type of business</Label>
                                            <Input id="biz_type" value={data.business_type} onChange={(e) => update({ business_type: e.target.value })} placeholder="e.g., Retail, Manufacturing" className="mt-1.5" />
                                        </div>
                                        <div>
                                            <Label>Is your business registered?</Label>
                                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                                                <RadioOption name="biz_reg" value="yes" label="Yes" checked={data.business_registered === true} onChange={() => update({ business_registered: true })} />
                                                <RadioOption name="biz_reg" value="no" label="No" checked={data.business_registered === false} onChange={() => update({ business_registered: false })} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data.occupation === 'salaried' && (
                                    <div>
                                        <Label>Government or Private?</Label>
                                        <div className="grid grid-cols-2 gap-2 mt-1.5">
                                            <RadioOption name="employer" value="government" label="Government" checked={data.employer_type === 'government'} onChange={(v) => update({ employer_type: v })} />
                                            <RadioOption name="employer" value="private" label="Private" checked={data.employer_type === 'private'} onChange={(v) => update({ employer_type: v })} />
                                        </div>
                                    </div>
                                )}
                                <SelectField id="income" label="Annual Family Income (in Rupees) *" value={data.annual_income} onChange={(v) => update({ annual_income: v })} options={INCOME_RANGES.map((r) => ({ value: r.value, label: r.label }))} />
                            </div>
                        )}

                        {/* Step 6: Family */}
                        {step === 5 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Users className="h-5 w-5 text-brand-blue" /> Family Details</h2>
                                <div>
                                    <Label htmlFor="dependents">Number of Family Members *</Label>
                                    <Input id="dependents" type="number" min="1" value={data.number_of_dependents} onChange={(e) => update({ number_of_dependents: e.target.value })} placeholder="Including yourself" className="mt-1.5" />
                                </div>
                                <div>
                                    <Label>Are you a single parent? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="single_parent" value="yes" label="Yes" checked={data.is_single_parent === true} onChange={() => update({ is_single_parent: true })} />
                                        <RadioOption name="single_parent" value="no" label="No" checked={data.is_single_parent === false} onChange={() => update({ is_single_parent: false })} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="children">Number of Children</Label>
                                    <Input id="children" type="number" min="0" value={data.number_of_children} onChange={(e) => update({ number_of_children: e.target.value })} className="mt-1.5" />
                                </div>
                                <div>
                                    <Label>Do you have any senior citizens (60+) in your family? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="senior" value="yes" label="Yes" checked={data.has_senior_citizens === true} onChange={() => update({ has_senior_citizens: true })} />
                                        <RadioOption name="senior" value="no" label="No" checked={data.has_senior_citizens === false} onChange={() => update({ has_senior_citizens: false })} />
                                    </div>
                                </div>
                                {data.has_senior_citizens && (
                                    <div>
                                        <Label htmlFor="senior_count">How many?</Label>
                                        <Input id="senior_count" type="number" min="1" value={data.senior_citizen_count} onChange={(e) => update({ senior_citizen_count: e.target.value })} className="mt-1.5" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 7: Health */}
                        {step === 6 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Heart className="h-5 w-5 text-brand-blue" /> Health & Disability</h2>
                                <div>
                                    <Label>Does any family member have a disability? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="disability" value="yes" label="Yes" checked={data.disability === true} onChange={() => update({ disability: true })} />
                                        <RadioOption name="disability" value="no" label="No" checked={data.disability === false} onChange={() => update({ disability: false })} />
                                    </div>
                                </div>
                                {data.disability && (
                                    <>
                                        <SelectField id="dis_who" label="Who?" value={data.disability_who} onChange={(v) => update({ disability_who: v })} options={['Self', 'Spouse', 'Child', 'Parent', 'Other'].map((w) => ({ value: w.toLowerCase(), label: w }))} />
                                        <SelectField id="dis_type" label="Type of disability" value={data.disability_type} onChange={(v) => update({ disability_type: v })} options={DISABILITY_TYPES.map((d) => ({ value: d, label: d }))} />
                                        <div>
                                            <Label htmlFor="dis_pct">Disability percentage</Label>
                                            <Input id="dis_pct" type="number" min="0" max="100" value={data.disability_percentage} onChange={(e) => update({ disability_percentage: e.target.value })} placeholder="e.g., 40" className="mt-1.5" />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <Label>Does any family member have a serious/chronic illness? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="illness" value="yes" label="Yes" checked={data.has_chronic_illness === true} onChange={() => update({ has_chronic_illness: true })} />
                                        <RadioOption name="illness" value="no" label="No" checked={data.has_chronic_illness === false} onChange={() => update({ has_chronic_illness: false })} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Do you have health insurance?</Label>
                                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                                        <RadioOption name="insurance" value="yes" label="Yes" checked={data.has_health_insurance === true} onChange={() => update({ has_health_insurance: true })} />
                                        <RadioOption name="insurance" value="no" label="No" checked={data.has_health_insurance === false} onChange={() => update({ has_health_insurance: false })} />
                                        <RadioOption name="insurance" value="unknown" label="Don't know" checked={data.has_health_insurance === null && step === 6} onChange={() => update({ has_health_insurance: null })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 8: Housing */}
                        {step === 7 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Home className="h-5 w-5 text-brand-blue" /> Housing & Property</h2>
                                <div>
                                    <Label>Current Housing Status *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        {[{ v: 'pucca', l: 'Own Pucca House' }, { v: 'semi_pucca', l: 'Own Semi-Pucca House' }, { v: 'kachha', l: 'Own Kachha House' }, { v: 'rented', l: 'Rented' }, { v: 'homeless', l: 'Homeless' }].map((h) => (
                                            <RadioOption key={h.v} name="house" value={h.v} label={h.l} checked={data.house_type === h.v} onChange={(v) => update({ house_type: v as QuestionnaireData['house_type'] })} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>Do you own any land? *</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                                        <RadioOption name="land_gen" value="yes" label="Yes" checked={data.land_ownership_general === true} onChange={() => update({ land_ownership_general: true })} />
                                        <RadioOption name="land_gen" value="no" label="No" checked={data.land_ownership_general === false} onChange={() => update({ land_ownership_general: false })} />
                                    </div>
                                </div>
                                {data.land_ownership_general && (
                                    <div>
                                        <Label htmlFor="land_gen_area">Land area in acres</Label>
                                        <Input id="land_gen_area" type="number" step="0.5" value={data.land_area_general} onChange={(e) => update({ land_area_general: e.target.value })} placeholder="e.g., 1.5" className="mt-1.5" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 9: Specific Needs */}
                        {step === 8 && (
                            <div className="space-y-5">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Target className="h-5 w-5 text-brand-blue" /> Specific Needs</h2>
                                <p className="text-sm text-muted-foreground">What kind of government support are you looking for? Select all that apply:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {SPECIFIC_NEEDS_OPTIONS.map((need) => {
                                        const isChecked = data.specific_needs.includes(need.value);
                                        return (
                                            <label key={need.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue' : 'border-border hover:border-brand-blue/30'
                                                }`}>
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(checked) => {
                                                        const newNeeds = checked
                                                            ? [...data.specific_needs, need.value]
                                                            : data.specific_needs.filter((n) => n !== need.value);
                                                        update({ specific_needs: newNeeds as SpecificNeed[] });
                                                    }}
                                                />
                                                <span className="text-sm">{need.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {data.specific_needs.includes('other') && (
                                    <div>
                                        <Label htmlFor="other_needs">Please specify</Label>
                                        <Input id="other_needs" value={data.other_needs} onChange={(e) => update({ other_needs: e.target.value })} placeholder="Describe your specific needs" className="mt-1.5" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 10: Review */}
                        {step === 9 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Review Your Answers</h2>
                                <p className="text-sm text-muted-foreground">Please review your answers below. Click &quot;Edit&quot; to change any section.</p>

                                {[
                                    {
                                        title: 'Personal', step: 0, items: [
                                            ['Name', data.full_name], ['DOB', data.date_of_birth], ['Gender', data.gender], ['Marital Status', data.marital_status], ['Religion', data.religion], ['Minority', data.minority_status ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Location', step: 1, items: [
                                            ['State', data.state], ['District', data.district], ['Area', data.location_type], ['PIN', data.pin_code || 'Not provided'],
                                        ]
                                    },
                                    {
                                        title: 'Category', step: 2, items: [
                                            ['Category', data.category?.toUpperCase()], ['BPL Card', data.bpl_card ? 'Yes' : 'No'], ['Aadhaar', data.has_aadhaar ? 'Yes' : 'No'], ['Bank Account', data.has_bank_account ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Education', step: 3, items: [
                                            ['Level', EDUCATION_LABELS[data.education_level] || data.education_level], ['Student', data.is_student ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Occupation', step: 4, items: [
                                            ['Occupation', OCCUPATION_LABELS[data.occupation] || data.occupation], ['Income', INCOME_RANGES.find((r) => r.value === data.annual_income)?.label || data.annual_income],
                                        ]
                                    },
                                    {
                                        title: 'Family', step: 5, items: [
                                            ['Members', data.number_of_dependents], ['Children', data.number_of_children], ['Single Parent', data.is_single_parent ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Health', step: 6, items: [
                                            ['Disability', data.disability ? 'Yes' : 'No'], ['Chronic Illness', data.has_chronic_illness ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Housing', step: 7, items: [
                                            ['Housing', data.house_type], ['Land', data.land_ownership_general ? 'Yes' : 'No'],
                                        ]
                                    },
                                    {
                                        title: 'Needs', step: 8, items: [
                                            ['Selected', data.specific_needs.length + ' areas'],
                                        ]
                                    },
                                ].map((section) => (
                                    <div key={section.title} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-sm">{section.title}</h3>
                                            <Button variant="ghost" size="sm" onClick={() => goToStep(section.step)} className="text-brand-blue text-xs h-7">Edit</Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            {section.items.map(([label, value]) => (
                                                <div key={String(label)} className="text-xs">
                                                    <span className="text-muted-foreground">{label}: </span>
                                                    <span className="font-medium">{String(value) || '—'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <label className="flex items-start gap-3 p-4 rounded-lg border bg-brand-blue/5">
                                    <Checkbox id="confirm" className="mt-0.5" checked={confirmed} onCheckedChange={(checked) => setConfirmed(checked === true)} />
                                    <span className="text-sm">I confirm that all information provided is accurate to the best of my knowledge. I understand that the accuracy of my scheme matches depends on the accuracy of this information.</span>
                                </label>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <Button
                                variant="outline"
                                onClick={prev}
                                disabled={step === 0}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>

                            {step < 9 ? (
                                <Button
                                    onClick={next}
                                    className="bg-brand-saffron hover:bg-brand-saffron/90 text-white"
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <div className="flex flex-col items-end gap-1">
                                    <Button
                                        onClick={handleSubmit}
                                        className={`bg-brand-green hover:bg-brand-green/90 text-white font-semibold ${!confirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        size="lg"
                                        disabled={!confirmed}
                                    >
                                        Submit & Find Schemes
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    {!confirmed && (
                                        <p className="text-xs text-muted-foreground">Please confirm the checkbox above</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
