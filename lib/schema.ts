import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    varchar,
    pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    gender: text("gender").notNull(), // New field for gender
    phoneNumber: text("phoneNumber").notNull(), // New field for phone number
    password: text("password"),
    salt: text("passwordSalt"),
    roleId: text("role_id").references(() => roles.id),
    location: text("location"), // User's location
    university: text("university"), // User's university
    summary: text("summary"), // User's summary or bio
    resumeUrl: text("resume_url"),
    skills: text("skills"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const roles = pgTable("roles", {
    id: text("id").primaryKey(),
    role: varchar("role", { length: 50 }).unique().notNull(), // 'candidate', 'employer'
    permissions: text("permissions").notNull(), // Comma-separated permissions
});

export const companies = pgTable("companies", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    logo: text("logo"),
    website: text("website").notNull(),
   
});

export const jobTypeEnum = pgEnum("type",["contracts", "jobs", "internships"]);
export const workplaceTypeEnum = pgEnum("workplaceType",["remote", "office", "hybrid"]);
export const stipendTypeEnum = pgEnum("stipendType",["fixed", "performance-based", "unpaid", "fixed + performance-based"]);
export const diversityTypeEnum = pgEnum("diversityType",["female", "male", "transgender", "intersex", "non-binary", "other"]);
export const experienceTypeEnum = pgEnum("experienceType",["fresher", "experienced", "both"]);
export const degreeTypeEnum = pgEnum("degreeType",["bachelor", "master", "dual", "other", "all"]);
export const benefitsTypeEnum = pgEnum("benefitsType",["health-insurance", "paid-leave", "work-from-home", "flexible-hours", "performance-bonus", "other"]);
export const jobStatusEnum = pgEnum("status",["active", "inactive", "filled"]);
export const passoutYearEnum = pgEnum("passoutYear",["2019", "2020", "2021", "2022","2023","2024","2025", "2026", "2027", "2028"]);

export const fieldEnum = pgEnum("field",["engineering", "business", "design", "arts", "science", "commerce", "medical", "law", "other"]);

export const opportunities = pgTable("opportunities", {
    id: text("id").primaryKey(),
    companyId: text("companyId").references(() => companies.id),
    title: text("title").notNull(),
    description: text("description").notNull(),
    duration: text("duration").notNull().default("not-declared"),
    location: text("location").array().notNull(),
    type: jobTypeEnum('type').notNull(),
    workplaceType: workplaceTypeEnum("workplaceType").notNull(),
    stipendType: stipendTypeEnum("stipendType").notNull(),
    diversityType: diversityTypeEnum("diversityType"),
    experience: experienceTypeEnum("experience").notNull(),
    yearsOfExperience: text("yearsOfExperience").notNull(),
    degree: text("degree").array(), // Reference degree table
    benfits: benefitsTypeEnum("benefitsType").array(),
    salary: text("salary"),
    status: jobStatusEnum("status").notNull().default("active"),
    jobLink: text("jobLink").notNull(),
    passoutYear: passoutYearEnum("passoutYear").array(),
    category: text("category").array(), // Add a category table and reference it here
    deadline: timestamp("deadline", { mode: "date" }).notNull(),
    postedAt: timestamp("postedAt", { mode: "date" }).notNull(),
    requireSkils: text("requiredSkils"),
});

export const degrees = pgTable("degrees", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    field: fieldEnum("field").notNull(),
});