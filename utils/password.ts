import { randomBytes, pbkdf2Sync } from 'crypto';

/**
 * Generates a random salt.
 * @param length The length of the salt.
 * @returns A base64-encoded salt string.
 */
export function generateSalt(length: number = 16): string {
  return randomBytes(length).toString('base64');
}

/**
 * Hashes a password using PBKDF2.
 * @param password The password to hash.
 * @param salt The salt to use in the hashing process.
 * @param iterations The number of iterations for the hashing process (default: 10000).
 * @param keyLength The desired length of the derived key (default: 64 bytes).
 * @param digest The hash function to use (default: 'sha512').
 * @returns The hashed password as a base64-encoded string.
 */
export function hashPassword(
  password: string,
  salt: string,
  iterations: number = 10000,
  keyLength: number = 64,
  digest: string = 'sha512'
): string {
  const hashed = pbkdf2Sync(password, salt, iterations, keyLength, digest);
  return hashed.toString('base64');
}

/**
 * Verifies a password by comparing it to a hashed value.
 * @param password The password to verify.
 * @param hashedPassword The hashed password to compare against.
 * @param salt The salt used during hashing.
 * @param iterations The number of iterations used during hashing (default: 10000).
 * @param keyLength The key length used during hashing (default: 64 bytes).
 * @param digest The hash function used during hashing (default: 'sha512').
 * @returns True if the password matches the hash, false otherwise.
 */

export function verifyPassword(
  password: string,
  hashedPassword: string,
  salt: string,
  iterations: number = 10000,
  keyLength: number = 64,
  digest: string = 'sha512'
): boolean {
  const hashedInput = hashPassword(password, salt, iterations, keyLength, digest);
  return hashedInput === hashedPassword;
}
