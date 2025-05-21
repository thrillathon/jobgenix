CREATE TYPE "public"."benefitsType" AS ENUM('health-insurance', 'paid-leave', 'work-from-home', 'flexible-hours', 'performance-bonus', 'other');--> statement-breakpoint
CREATE TYPE "public"."degreeType" AS ENUM('bachelor', 'master', 'dual', 'other', 'all');--> statement-breakpoint
CREATE TYPE "public"."diversityType" AS ENUM('female', 'male', 'transgender', 'intersex', 'non-binary', 'other');--> statement-breakpoint
CREATE TYPE "public"."experienceType" AS ENUM('fresher', 'experienced', 'both');--> statement-breakpoint
CREATE TYPE "public"."field" AS ENUM('engineering', 'business', 'design', 'arts', 'science', 'commerce', 'medical', 'law', 'other');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'filled');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('contracts', 'jobs', 'internships');--> statement-breakpoint
CREATE TYPE "public"."passoutYear" AS ENUM('2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028');--> statement-breakpoint
CREATE TYPE "public"."stipendType" AS ENUM('fixed', 'performance-based', 'unpaid', 'fixed + performance-based');--> statement-breakpoint
CREATE TYPE "public"."workplaceType" AS ENUM('remote', 'office', 'hybrid');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"website" text NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "degrees" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"field" "field" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" text PRIMARY KEY NOT NULL,
	"companyId" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"duration" text DEFAULT 'not-declared' NOT NULL,
	"location" text[] NOT NULL,
	"type" "type" NOT NULL,
	"workplaceType" "workplaceType" NOT NULL,
	"stipendType" "stipendType" NOT NULL,
	"diversityType" "diversityType",
	"experience" "experienceType" NOT NULL,
	"yearsOfExperience" text NOT NULL,
	"degree" text[],
	"benefitsType" "benefitsType"[],
	"salary" text,
	"status" "status" DEFAULT 'active' NOT NULL,
	"jobLink" text NOT NULL,
	"passoutYear" "passoutYear"[],
	"category" text[],
	"deadline" timestamp NOT NULL,
	"postedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"role" varchar(50) NOT NULL,
	"permissions" text NOT NULL,
	CONSTRAINT "roles_role_unique" UNIQUE("role")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"gender" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"password" text,
	"passwordSalt" text,
	"role_id" text,
	"location" text,
	"university" text,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;