export type ImmigrationStatus = 'PR holder' | 'Work permit' | 'Student';
export type Province = 'Ontario' | 'BC' | 'Alberta' | 'Quebec' | 'Other';
export type FamilySituation = 'Single' | 'With partner' | 'With dependents';
export type EmploymentStatus = 'Have a job offer' | 'Looking for work' | 'Other';
export type ArrivalTimeline = 'Already here' | 'Within 1 month' | 'In 3+ months';
export type BiggestConcern = 'Documentation' | 'Healthcare' | 'Housing' | 'Employment';

export interface OnboardingAnswers {
  name: string;
  email: string;
  arrivalDate: string; // Exact arrival date, e.g. YYYY-MM-DD for deadline calculations
  status: ImmigrationStatus; // This maps directly to "visa type"
  province: Province;
  family?: FamilySituation;
  employment?: EmploymentStatus;
  arrival?: ArrivalTimeline;
  concern?: BiggestConcern;
  hasPaid: boolean; // false = Free Essentials, true = Confident Start / White Glove
  tier: 'free' | 'confident' | 'whiteglove';
}

export type TaskPriority = 'Critical' | 'Important' | 'Optional';
export type TaskCategory = 'Documentation' | 'Healthcare' | 'Housing' | 'Employment' | 'Finance' | 'Community';

export interface Task {
  id: string;
  title: string;
  week: number;
  priority: TaskPriority;
  category: TaskCategory;
  dueDateDays: number; // relative days from arrival helper
  status: 'not_started' | 'in_progress' | 'completed';
  whatAndWhy: string;
  whereText: string;
  whereLink?: string;
  howSteps: string[];
  requiredDocs: { text: string; checked: boolean }[];
  applicableProvinces?: Province[];
  applicableStatus?: ImmigrationStatus[];
  applicableConcern?: BiggestConcern;
  lockedOnFree?: boolean;
}
