import { ZodError } from "zod";

/**
 * Parses a ZodError and returns an array of human-readable error messages.
 * @param error - The ZodError object
 * @returns An array of formatted error messages.
 */
export function parseZodError(error: ZodError): string[] {
  return error.errors.map(err => `${err.path.join(".")}: ${err.message}`);
}
