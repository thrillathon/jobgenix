import { object, string } from "zod";

export const signUpSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),

  firstName: string({ required_error: "First name is required" })
    .min(1, "First name is required"),

  lastName: string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),

  // gender: string({ required_error: "Gender is required" })
  //   .min(1, "Gender is required"),

  gender: string().optional(),

  phoneNumber: string({ required_error: "Phone number is required" })
    .regex(/^\+91 \d{10}$/, "Phone number must follow the format +91 XXXXXXXXXX")
    .optional(),
});


export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

