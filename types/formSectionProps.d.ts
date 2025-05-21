import { Opportunity } from "./opportunityType";

export type formSectionProps = {
  setFormData: <K extends keyof Opportunity>(field: K, value: Opportunity[K]) => void
}