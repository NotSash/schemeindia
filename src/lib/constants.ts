// ============================================================
// SchemeIndia — Constants
// ============================================================

import { PricingPlan, SpecificNeed } from './types';

// ---------- Indian States & UTs ----------

export const STATES_AND_UTS = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
] as const;

// ---------- Districts by State (top cities per state) ----------

export const DISTRICTS: Record<string, string[]> = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa', 'Tirupati', 'Anakapalli', 'Alluri Sitarama Raju'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Upper Siang'],
    'Assam': ['Baksa', 'Barpeta', 'Cachar', 'Darrang', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'Tinsukia'],
    'Bihar': ['Araria', 'Aurangabad', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Darbhanga', 'Gaya', 'Gopalganj', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Saharsa', 'Samastipur', 'Saran', 'Sitamarhi', 'Vaishali', 'West Champaran'],
    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Janjgir-Champa', 'Korba', 'Raipur', 'Rajnandgaon', 'Surguja'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Dahod', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Mehsana', 'Panchmahal', 'Rajkot', 'Sabarkantha', 'Surat', 'Vadodara', 'Valsad'],
    'Haryana': ['Ambala', 'Bhiwani', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Giridih', 'Godda', 'Hazaribagh', 'Palamu', 'Ranchi', 'West Singhbhum'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkamagaluru', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Mandya', 'Mysuru', 'Raichur', 'Shimoga', 'Tumkur', 'Udupi', 'Uttara Kannada'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'Madhya Pradesh': ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Morena', 'Rewa', 'Sagar', 'Satna', 'Ujjain', 'Vidisha', 'Dewas', 'Hoshangabad', 'Katni', 'Chhindwara', 'Shahdol'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Jalgaon', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nashik', 'Osmanabad', 'Palghar', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim'],
    'Manipur': ['Bishnupur', 'Churachandpur', 'Imphal East', 'Imphal West', 'Senapati', 'Thoubal', 'Ukhrul'],
    'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri-Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    'Mizoram': ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip'],
    'Nagaland': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Kalahandi', 'Kendrapara', 'Keonjhar', 'Khordha', 'Koraput', 'Mayurbhanj', 'Puri', 'Rayagada', 'Sambalpur', 'Sundargarh'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Moga', 'Mohali', 'Muktsar', 'Patiala', 'Rupnagar', 'Sangrur'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Salem', 'Sivaganga', 'Thanjavur', 'Theni', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tuticorin', 'Vellore', 'Villupuram', 'Virudhunagar'],
    'Telangana': ['Adilabad', 'Hyderabad', 'Jagtial', 'Jangaon', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Medak', 'Medchal-Malkajgiri', 'Nalgonda', 'Nirmal', 'Nizamabad', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Warangal'],
    'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Azamgarh', 'Bahraich', 'Ballia', 'Bareilly', 'Basti', 'Bulandshahr', 'Deoria', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Ghaziabad', 'Ghazipur', 'Gorakhpur', 'Hardoi', 'Jaunpur', 'Jhansi', 'Kanpur Dehat', 'Kanpur Nagar', 'Lakhimpur Kheri', 'Lucknow', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Noida', 'Pratapgarh', 'Rae Bareli', 'Saharanpur', 'Shahjahanpur', 'Sitapur', 'Sultanpur', 'Unnao', 'Varanasi'],
    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    'West Bengal': ['Bankura', 'Birbhum', 'Burdwan', 'Cooch Behar', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'North Dinajpur', 'Paschim Medinipur', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'South Dinajpur'],
    'Andaman and Nicobar Islands': ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Jammu and Kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Lakshadweep': ['Lakshadweep'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
};

// ---------- Religions ----------

export const RELIGIONS = [
    'Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Parsi', 'Other',
] as const;

// ---------- Occupation Labels ----------

export const OCCUPATION_LABELS: Record<string, string> = {
    farmer: 'Farmer',
    student: 'Student',
    salaried: 'Salaried Employee',
    self_employed: 'Self-Employed Professional',
    business_owner: 'Business Owner',
    daily_wage_worker: 'Daily Wage Worker',
    unemployed: 'Unemployed',
    retired: 'Retired',
    homemaker: 'Homemaker',
    other: 'Other',
};

// ---------- Education Labels ----------

export const EDUCATION_LABELS: Record<string, string> = {
    no_formal: 'No Formal Education',
    primary: 'Primary (Class 1-5)',
    secondary: 'Secondary (Class 6-10)',
    higher_secondary: 'Higher Secondary (Class 11-12)',
    diploma: 'Diploma / ITI',
    iti: 'ITI',
    graduate: 'Graduate',
    post_graduate: 'Post-Graduate',
    doctorate: 'Doctorate',
};

// ---------- Income Ranges ----------

export const INCOME_RANGES = [
    { label: 'Below ₹1,00,000', value: '100000', min: 0, max: 100000 },
    { label: '₹1,00,000 – ₹2,50,000', value: '250000', min: 100000, max: 250000 },
    { label: '₹2,50,000 – ₹5,00,000', value: '500000', min: 250000, max: 500000 },
    { label: '₹5,00,000 – ₹8,00,000', value: '800000', min: 500000, max: 800000 },
    { label: '₹8,00,000 – ₹12,00,000', value: '1200000', min: 800000, max: 1200000 },
    { label: '₹12,00,000 – ₹25,00,000', value: '2500000', min: 1200000, max: 2500000 },
    { label: 'Above ₹25,00,000', value: '2500001', min: 2500000, max: Infinity },
] as const;

// ---------- Specific Needs Labels ----------

export const SPECIFIC_NEEDS_OPTIONS: { value: SpecificNeed; label: string }[] = [
    { value: 'financial_assistance', label: 'Financial Assistance / Direct Cash Transfer' },
    { value: 'housing', label: 'Housing / Home Construction' },
    { value: 'education', label: 'Education / Scholarships' },
    { value: 'health', label: 'Health / Medical / Insurance' },
    { value: 'agriculture', label: 'Agriculture / Farming Support' },
    { value: 'business_loan', label: 'Business Loan / Startup Support' },
    { value: 'skill_training', label: 'Skill Training / Employment' },
    { value: 'pension', label: 'Pension / Social Security' },
    { value: 'women_child', label: 'Women & Child Welfare' },
    { value: 'food_nutrition', label: 'Food / Nutrition Support' },
    { value: 'legal_aid', label: 'Legal Aid' },
    { value: 'other', label: 'Other' },
];

// ---------- Scheme Categories ----------

export const SCHEME_CATEGORIES = [
    { key: 'financial', label: 'Financial Assistance', icon: 'Banknote' },
    { key: 'education', label: 'Education & Scholarship', icon: 'GraduationCap' },
    { key: 'housing', label: 'Housing', icon: 'Home' },
    { key: 'health', label: 'Health & Insurance', icon: 'Heart' },
    { key: 'agriculture', label: 'Agriculture', icon: 'Leaf' },
    { key: 'employment', label: 'Employment & Skill', icon: 'Briefcase' },
    { key: 'business', label: 'Business & Entrepreneurship', icon: 'TrendingUp' },
    { key: 'social_security', label: 'Social Security & Pension', icon: 'Shield' },
    { key: 'women_child', label: 'Women & Child', icon: 'Users' },
    { key: 'other', label: 'Other', icon: 'MoreHorizontal' },
] as const;

// ---------- Pricing Plans ----------

export const PRICING_PLANS: PricingPlan[] = [
    {
        type: 'basic',
        name: 'Basic',
        price: 99,
        priceInPaise: 9900,
        features: [
            'List of matched scheme names',
            'Brief description of each scheme',
            'Match score for each scheme',
            'Total potential benefit amount',
            'Single profile search',
        ],
        validity: '30 days',
        validityDays: 30,
        highlighted: false,
        badge: null,
        searches: '1 search',
    },
    {
        type: 'detailed',
        name: 'Detailed',
        price: 299,
        priceInPaise: 29900,
        features: [
            'Everything in Basic plan',
            'Full eligibility details for each scheme',
            'Required documents checklist',
            'Step-by-step application process',
            'Direct application links',
            'Downloadable PDF report',
            'Up to 3 profile re-matches',
        ],
        validity: '90 days',
        validityDays: 90,
        highlighted: true,
        badge: 'Most Popular',
        searches: '3 searches',
    },
    {
        type: 'premium',
        name: 'Premium',
        price: 599,
        priceInPaise: 59900,
        features: [
            'Everything in Detailed plan',
            'AI-powered chat assistant',
            'Application deadline alerts',
            'New scheme notifications via email',
            'Priority support',
            'Unlimited profile updates & re-matches',
        ],
        validity: '365 days',
        validityDays: 365,
        highlighted: false,
        badge: 'Best Value',
        searches: 'Unlimited',
    },
];

// ---------- Disability Types ----------

export const DISABILITY_TYPES = [
    'Visual Impairment',
    'Hearing Impairment',
    'Locomotor Disability',
    'Mental Illness',
    'Intellectual Disability',
    'Multiple Disabilities',
    'Other',
] as const;

// ---------- Ration Card Labels ----------

export const RATION_CARD_LABELS: Record<string, string> = {
    aay: 'AAY (Antyodaya Anna Yojana)',
    phh: 'PHH (Priority Household)',
    nphh: 'NPHH (Non-Priority Household)',
    annapurna: 'Annapurna',
    none: 'None / Don\'t have',
};

// ---------- App Metadata ----------

export const APP_NAME = 'SchemeIndia';
export const APP_DESCRIPTION = 'Discover government schemes you are entitled to. India has over 3,000 government schemes worth lakhs of rupees. SchemeIndia uses AI to find every scheme that matches your profile.';
export const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const APP_TAGLINE = 'Discover Government Schemes You\'re Entitled To';
