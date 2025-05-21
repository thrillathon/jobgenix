import { CompanyType } from "./companyType";
import { Opportunity, WorkplaceType } from "./opportunityType";

export type JobDetailsProps = {
  companies: CompanyType;
  opportunities: Opportunity;
  children?: React.ReactNode;
  userId : string;
};

export type JobCardProps = {
  companyName: string;
  companyLogo: string | null; // Assuming logo might be nullable
  jobTitle: string;
  jobId: string;
  jobLocation: string;
  jobType: WorkplaceType; // Adjust based on actual enum values
  jobLink: string;
  requireskils : string | null;
};

