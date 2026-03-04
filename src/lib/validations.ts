// ============================================================
// SchemeIndia — Zod Validation Schemas
// ============================================================

import { z } from 'zod';

// ---------- Questionnaire Step Schemas ----------

export const personalInfoSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum({
        male: 'male',
        female: 'female',
        transgender: 'transgender',
        other: 'other',
    }),
    marital_status: z.enum({
        single: 'single',
        married: 'married',
        divorced: 'divorced',
        widowed: 'widowed',
    }),
    religion: z.string().min(1, 'Please select your religion'),
    minority_status: z.boolean(),
});

export const locationSchema = z.object({
    state: z.string().min(1, 'Please select your state'),
    district: z.string().min(1, 'Please select your district'),
    location_type: z.enum({
        rural: 'rural',
        urban: 'urban',
        semi_urban: 'semi_urban',
    }),
    pin_code: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit PIN code').or(z.literal('')),
});

export const socialCategorySchema = z.object({
    category: z.enum({
        general: 'general',
        obc: 'obc',
        sc: 'sc',
        st: 'st',
        ews: 'ews',
    }),
    bpl_card: z.boolean(),
    ration_card_type: z.enum({
        aay: 'aay',
        phh: 'phh',
        nphh: 'nphh',
        annapurna: 'annapurna',
        none: 'none',
    }),
    has_aadhaar: z.boolean(),
    has_bank_account: z.boolean(),
    ex_serviceman: z.boolean(),
});

export const educationSchema = z.object({
    education_level: z.enum({
        no_formal: 'no_formal',
        primary: 'primary',
        secondary: 'secondary',
        higher_secondary: 'higher_secondary',
        graduate: 'graduate',
        post_graduate: 'post_graduate',
        doctorate: 'doctorate',
        diploma: 'diploma',
        iti: 'iti',
    }),
    is_student: z.boolean(),
    student_level: z.string().optional(),
    institution_type: z.string().optional(),
});

export const occupationSchema = z.object({
    occupation: z.enum({
        farmer: 'farmer',
        student: 'student',
        salaried: 'salaried',
        self_employed: 'self_employed',
        business_owner: 'business_owner',
        daily_wage_worker: 'daily_wage_worker',
        unemployed: 'unemployed',
        retired: 'retired',
        homemaker: 'homemaker',
        other: 'other',
    }),
    land_ownership: z.boolean().optional(),
    land_area_acres: z.string().optional(),
    business_type: z.string().optional(),
    business_registered: z.boolean().optional(),
    employer_type: z.string().optional(),
    annual_income: z.string().min(1, 'Please select your income range'),
});

export const familySchema = z.object({
    number_of_dependents: z.string().min(1, 'Please enter number of family members'),
    is_single_parent: z.boolean(),
    number_of_children: z.string(),
    children_details: z.array(z.object({
        age: z.number(),
        gender: z.enum({ male: 'male', female: 'female', transgender: 'transgender', other: 'other' }),
        education_level: z.string().nullable(),
        is_studying: z.boolean(),
    })).optional(),
    has_senior_citizens: z.boolean(),
    senior_citizen_count: z.string().optional(),
});

export const healthSchema = z.object({
    disability: z.boolean(),
    disability_who: z.string().optional(),
    disability_type: z.string().optional(),
    disability_percentage: z.string().optional(),
    has_chronic_illness: z.boolean(),
    has_health_insurance: z.boolean().nullable(),
});

export const housingSchema = z.object({
    house_type: z.enum({
        pucca: 'pucca',
        semi_pucca: 'semi_pucca',
        kachha: 'kachha',
        homeless: 'homeless',
        rented: 'rented',
    }),
    land_ownership_general: z.boolean(),
    land_area_general: z.string().optional(),
});

export const specificNeedsSchema = z.object({
    specific_needs: z.array(z.string()).min(1, 'Please select at least one need'),
    other_needs: z.string().optional(),
});

// ---------- API Schemas ----------

export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    subject: z.string().min(1, 'Please enter a subject').max(200),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});

export const createOrderSchema = z.object({
    plan_type: z.enum({ basic: 'basic', detailed: 'detailed', premium: 'premium' }),
});

export const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
    plan_type: z.enum({ basic: 'basic', detailed: 'detailed', premium: 'premium' }),
});

export const chatMessageSchema = z.object({
    message: z.string().min(1).max(2000),
});

// ---------- Type Exports ----------

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type SocialCategoryData = z.infer<typeof socialCategorySchema>;
export type EducationData = z.infer<typeof educationSchema>;
export type OccupationData = z.infer<typeof occupationSchema>;
export type FamilyData = z.infer<typeof familySchema>;
export type HealthData = z.infer<typeof healthSchema>;
export type HousingData = z.infer<typeof housingSchema>;
export type SpecificNeedsData = z.infer<typeof specificNeedsSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;
export type VerifyPaymentData = z.infer<typeof verifyPaymentSchema>;
