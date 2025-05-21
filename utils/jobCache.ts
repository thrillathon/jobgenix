import { redis } from "@/lib/redis";
import { CompanyType } from "@/types/companyType";

type Opportunity = {
    id: string;
    companyId: string | null; // companyId can now be null
    title: string;
    description: string;
    location: string[] | null; // location can now be null
    duration: string | null; // duration can now be null
    type: string | null; // type is now a string instead of JobType enum
    workplaceType: string | null; // workplaceType is now a string instead of WorkplaceType enum
    stipendType: string | null; // stipendType is now a string instead of StipendType enum
    diversityType?: string | null; // diversityType is now an array of strings instead of DiversityType enum
    experience: string | null; // experience is now a string instead of ExperienceType enum
    yearsOfExperience: string | null; // yearsOfExperience can now be null
    degree?: string[] | null; // degree is now an array of strings instead of DegreeType enum
    benefits?: string[] | null; // benefits is now an array of strings instead of BenefitsType enum
    salary?: string | null; // salary can now be null or undefined
    status: string | null; // status is now a string instead of JobStatus enum
    jobLink: string | null; // jobLink can now be null
    passoutYear?: string[] | null; // passoutYear is now an array of strings instead of PassoutYear enum
    category?: string[] | null; // category is now an array of strings
    deadline: Date | null; // deadline can now be null
    postedAt: Date | null; // postedAt can now be null
};


type Job = {
    companies: CompanyType;
    opportunities: Opportunity
}

export async function getJobsById(id: string) {
    const cachedJob = await redis.get(`jobs:${id}`) as Job;
    return cachedJob;
}

export async function setJobsById(job: Job) {
    await redis.set(`jobs:${job.opportunities.id}`, job);
}