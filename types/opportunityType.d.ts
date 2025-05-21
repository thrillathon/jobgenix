export type JobType = "jobs" | "contracts" | "internships";
export type WorkplaceType = "remote" | "office" | "hybrid";
export type StipendType =
  | "fixed"
  | "performance-based"
  | "unpaid"
  | "fixed + performance-based";
export type DiversityType =
  | "female"
  | "male"
  | "transgender"
  | "intersex"
  | "non-binary"
  | "other";
export type ExperienceType = "fresher" | "experienced" | "both";
export type DegreeType = "bachelor" | "master" | "dual" | "other" | "all";
export type BenefitsType =
  | "health-insurance"
  | "paid-leave"
  | "work-from-home"
  | "flexible-hours"
  | "performance-bonus"
  | "other";
export type JobStatus = "active" | "inactive" | "filled";
export type PassoutYear =
  | "2019"
  | "2020"
  | "2021"
  | "2022"
  | "2023"
  | "2024"
  | "2025"
  | "2026"
  | "2027"
  | "2028";

export type Opportunity = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string[];
  duration?: string;
  type: JobType;
  workplaceType: WorkplaceType;
  stipendType: StipendType;
  diversityType?: DiversityType; // Array of diversity types (optional)
  experience: ExperienceType;
  yearsOfExperience: string;
  degree?: string[];
  benefits?: BenefitsType[]; // Array of benefits (optional)
  salary?: string;
  status: JobStatus;
  jobLink: string;
  passoutYear?: PassoutYear[]; // Array of passout years (optional)
  category?: string[]; // Array of categories (optional)
  deadline: string; // Date as a string (or use `Date` type)
  postedAt: string; // Date as a string (or use `Date` type)
  requireSkils?: string; // Array of skills required (optional)
};

export type Degree = {
  id: string;
  name: string;
  field: string;
};
