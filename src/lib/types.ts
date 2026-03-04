// ============================================================
// SchemeIndia — TypeScript Types & Interfaces
// ============================================================

// ---------- Enums / Unions ----------

export type Gender = 'male' | 'female' | 'transgender' | 'other';
export type Category = 'general' | 'obc' | 'sc' | 'st' | 'ews';
export type Occupation =
    | 'farmer'
    | 'student'
    | 'salaried'
    | 'self_employed'
    | 'business_owner'
    | 'unemployed'
    | 'retired'
    | 'homemaker'
    | 'daily_wage_worker'
    | 'other';

export type EducationLevel =
    | 'no_formal'
    | 'primary'
    | 'secondary'
    | 'higher_secondary'
    | 'graduate'
    | 'post_graduate'
    | 'doctorate'
    | 'diploma'
    | 'iti';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type RationCardType = 'aay' | 'phh' | 'nphh' | 'annapurna' | 'none';
export type HouseType = 'pucca' | 'semi_pucca' | 'kachha' | 'homeless' | 'rented';
export type SchemeLevel = 'central' | 'state' | 'district';
export type PlanType = 'basic' | 'detailed' | 'premium';

export type PaymentStatus = 'created' | 'attempted' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';
export type MatchStatus = 'matched' | 'applied' | 'received' | 'rejected' | 'not_interested';
export type ScrapeStatus = 'started' | 'completed' | 'failed' | 'partial';
export type ContactStatus = 'new' | 'read' | 'replied' | 'resolved';

export type SpecificNeed =
    | 'financial_assistance'
    | 'housing'
    | 'education'
    | 'health'
    | 'agriculture'
    | 'business_loan'
    | 'skill_training'
    | 'pension'
    | 'women_child'
    | 'food_nutrition'
    | 'legal_aid'
    | 'other';

// ---------- Scheme ----------

export interface SchemeBenefit {
    type: 'financial' | 'service' | 'subsidy' | 'insurance' | 'training' | 'other';
    amount_min: number | null;
    amount_max: number | null;
    frequency: 'one_time' | 'monthly' | 'quarterly' | 'annual' | 'as_needed' | null;
    description: string;
}

export interface SchemeEligibility {
    age_min: number | null;
    age_max: number | null;
    gender: string[];
    categories: string[];
    income_max: number | null;
    states: string[];
    location_type: string[];
    occupation: string[];
    education_min: string | null;
    land_ownership: boolean | null;
    bpl_required: boolean | null;
    disability_required: boolean | null;
    minority_required: boolean | null;
    ex_serviceman_required: boolean | null;
    marital_status: string[];
    custom_criteria: string[];
    exclusions: string[];
}

export interface SchemeApplication {
    mode: string[];
    online_url: string | null;
    offline_process: string | null;
    deadline: string | null;
}

export interface Scheme {
    id: string;
    source_id: string;
    source_url: string;
    source_name: string;
    name: string;
    ministry: string | null;
    description: string;
    benefits: SchemeBenefit;
    eligibility: SchemeEligibility;
    documents_required: string[];
    application: SchemeApplication;
    tags: string[];
    level: SchemeLevel;
    state: string | null;
    is_active: boolean;
    last_scraped_at: string;
    raw_content_hash: string;
    created_at: string;
    updated_at: string;
}

// ---------- User ----------

export interface User {
    id: string;
    email: string;
    phone: string | null;
    full_name: string;
    created_at: string;
    updated_at: string;
}

export interface ChildDetail {
    age: number;
    gender: Gender;
    education_level: EducationLevel | null;
    is_studying: boolean;
}

export interface UserProfile {
    id: string;
    user_id: string;
    state: string;
    district: string;
    age: number;
    date_of_birth: string;
    gender: Gender;
    category: Category;
    religion: string;
    minority_status: boolean;
    annual_income: number;
    occupation: Occupation;
    education_level: EducationLevel;
    marital_status: MaritalStatus;
    disability: boolean;
    disability_type: string | null;
    disability_percentage: number | null;
    bpl_card: boolean;
    ration_card_type: RationCardType;
    land_ownership: boolean;
    land_area_acres: number | null;
    house_type: HouseType;
    number_of_dependents: number;
    has_bank_account: boolean;
    has_aadhaar: boolean;
    ex_serviceman: boolean;
    is_single_parent: boolean;
    number_of_children: number;
    children_details: ChildDetail[];
    specific_needs: SpecificNeed[];
    location_type: 'rural' | 'urban' | 'semi_urban';
    is_student: boolean;
    student_level: string | null;
    institution_type: string | null;
    business_type: string | null;
    business_registered: boolean | null;
    employer_type: string | null;
    has_senior_citizens: boolean;
    senior_citizen_count: number;
    has_chronic_illness: boolean;
    has_health_insurance: boolean | null;
    pin_code: string | null;
    created_at: string;
    updated_at: string;
}

// ---------- Payment ----------

export interface Payment {
    id: string;
    user_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string | null;
    razorpay_signature: string | null;
    amount: number; // in paise
    currency: string;
    plan_type: PlanType;
    status: PaymentStatus;
    payment_method: PaymentMethod | null;
    receipt_url: string | null;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

// ---------- Scheme Match ----------

export interface SchemeMatch {
    id: string;
    user_id: string;
    payment_id: string;
    scheme_id: string;
    match_score: number;
    match_reasons: string[];
    mismatch_fields: string[];
    status: MatchStatus;
    created_at: string;
    scheme?: Scheme; // joined data
}

// ---------- Scrape Log ----------

export interface ScrapeLog {
    id: string;
    source_name: string;
    source_url: string | null;
    status: ScrapeStatus;
    schemes_found: number;
    schemes_added: number;
    schemes_updated: number;
    error_message: string | null;
    duration_ms: number | null;
    started_at: string;
    completed_at: string | null;
}

// ---------- Contact Submission ----------

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: ContactStatus;
    created_at: string;
}

// ---------- Pricing ----------

export interface PricingPlan {
    type: PlanType;
    name: string;
    price: number; // in rupees
    priceInPaise: number;
    features: string[];
    validity: string;
    validityDays: number;
    highlighted: boolean;
    badge: string | null;
    searches: string;
}

// ---------- Matching ----------

export interface MatchPreview {
    totalSchemes: number;
    totalBenefitAmount: number;
    categoryBreakdown: Record<string, number>;
    blurredSchemes: { name: string; matchScore: number; category: string }[];
}

export interface MatchResult {
    scheme: Scheme;
    matchScore: number;
    matchReasons: string[];
    mismatchFields: string[];
}

export interface FullMatchResult {
    totalSchemes: number;
    totalBenefitAmount: number;
    categoryBreakdown: Record<string, number>;
    matches: MatchResult[];
}

// ---------- Questionnaire ----------

export interface QuestionnaireData {
    // Step 1: Personal
    full_name: string;
    date_of_birth: string;
    gender: Gender | '';
    marital_status: MaritalStatus | '';
    religion: string;
    minority_status: boolean | null;

    // Step 2: Location
    state: string;
    district: string;
    location_type: 'rural' | 'urban' | 'semi_urban' | '';
    pin_code: string;

    // Step 3: Social Category
    category: Category | '';
    bpl_card: boolean | null;
    ration_card_type: RationCardType | '';
    has_aadhaar: boolean | null;
    has_bank_account: boolean | null;
    ex_serviceman: boolean | null;

    // Step 4: Education
    education_level: EducationLevel | '';
    is_student: boolean | null;
    student_level: string;
    institution_type: string;

    // Step 5: Occupation & Income
    occupation: Occupation | '';
    land_ownership: boolean | null;
    land_area_acres: string;
    business_type: string;
    business_registered: boolean | null;
    employer_type: string;
    annual_income: string;

    // Step 6: Family
    number_of_dependents: string;
    is_single_parent: boolean | null;
    number_of_children: string;
    children_details: ChildDetail[];
    has_senior_citizens: boolean | null;
    senior_citizen_count: string;

    // Step 7: Health
    disability: boolean | null;
    disability_who: string;
    disability_type: string;
    disability_percentage: string;
    has_chronic_illness: boolean | null;
    has_health_insurance: boolean | null;

    // Step 8: Housing
    house_type: HouseType | '';
    land_ownership_general: boolean | null;
    land_area_general: string;

    // Step 9: Specific Needs
    specific_needs: SpecificNeed[];
    other_needs: string;

    // Meta
    currentStep: number;
    isComplete: boolean;
}

// ---------- Chat ----------

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

// ---------- Admin Stats ----------

export interface AdminStats {
    totalUsers: number;
    totalRevenue: number;
    totalSchemes: number;
    activeSchemes: number;
    totalPayments: number;
    lastScrapeAt: string | null;
    lastScrapeStatus: ScrapeStatus | null;
    planBreakdown: Record<PlanType, number>;
    recentPayments: Payment[];
    recentUsers: User[];
}
