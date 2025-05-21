import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            image : string | null;
        }
    }
    interface User extends DefaultUser {
        roleId: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        name: string;
        gender: string;
        phoneNumber: string;
        picture?: string;  // If 'image' should map to 'picture'
        email_verified?: boolean; // If needed, add an appropriate default
        access_token?: string; // If needed, add an appropriate default
        password: string | null;
        salt: string | null;
    }
}