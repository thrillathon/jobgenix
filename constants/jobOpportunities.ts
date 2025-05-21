import { benefitsTypeEnum, degreeTypeEnum, diversityTypeEnum, experienceTypeEnum, jobStatusEnum, jobTypeEnum, passoutYearEnum, stipendTypeEnum, workplaceTypeEnum } from '@/lib/schema';
import { z } from 'zod';

export const jobTypeSchema = z.enum(jobTypeEnum.enumValues);
export const workplaceTypeSchema = z.enum(workplaceTypeEnum.enumValues);
export const stipendTypeSchema = z.enum(stipendTypeEnum.enumValues);
export const diversityTypeSchema = z.enum(diversityTypeEnum.enumValues);
export const experienceTypeSchema = z.enum(experienceTypeEnum.enumValues);
export const degreeTypeSchema = z.enum(degreeTypeEnum.enumValues);
export const benefitsTypeSchema = z.enum(benefitsTypeEnum.enumValues);
export const jobStatusSchema = z.enum(jobStatusEnum.enumValues);
export const passoutYearSchema = z.enum(passoutYearEnum.enumValues);