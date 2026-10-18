export type PersonaRole = 'member' | 'owner' | 'admin';

export interface UserPersona {
  id: string;
  name: string;
  role: PersonaRole;
  title: string;
  email: string;
  avatar: string;
  gymId?: string;
  gymName?: string;
}

export interface Trainer {
  name: string;
  role: string;
  experience: string;
  specialty: string;
  photo: string;
}

export interface Gym {
  id: string;
  name: string;
  tagline: string;
  ownerName: string; // "Ansh Dwivedi"
  city: string;
  address: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  amenities: string[];
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  hours: string;
  phone: string;
  verified: boolean;
  status: 'active' | 'suspended';
  description: string;
  trainers: Trainer[];
}

export interface MembershipPlan {
  id: string;
  gymId: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual';
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
}

export interface MemberPass {
  passId: string;
  memberName: string;
  memberEmail: string;
  gymId: string;
  gymName: string;
  planType: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite';
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'active' | 'expired';
  qrCodeData: string;
  checkInsCount: number;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  gymName: string;
  verified: boolean;
}

export interface PersonalRecord {
  id: string;
  athleteName: string;
  lift: 'Squat' | 'Bench Press' | 'Deadlift' | 'Overhead Press';
  weightKg: number;
  reps: number;
  date: string;
  status: 'verified' | 'pending' | 'rejected';
  verifiedBy?: string; // "Ansh Dwivedi (Gym Owner)"
  gymName: string;
  videoNote?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'supplements' | 'gear' | 'apparel';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  specs: string[];
  sizeOrFlavor?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  trackingNumber: string;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  participantsCount: number;
  daysRemaining: number;
  reward: string;
  joined: boolean;
  targetMetric: string;
  userProgress: number;
  maxProgress: number;
  category: 'strength' | 'consistency' | 'endurance';
}

export interface LeaderboardAthlete {
  rank: number;
  name: string;
  gymName: string;
  city: string;
  streakDays: number;
  squatKg: number;
  benchKg: number;
  deadliftKg: number;
  totalKg: number;
  verified: boolean;
  avatar: string;
}
