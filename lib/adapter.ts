/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - We use this temporarily to override type issues while we fix them properly
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { getUserAdditionalInfo } from "@/utils/getUserInfo";
import { ROLE_IDS } from "@/constants/roles";
import { eq } from "drizzle-orm";
import { deleteUserFromCache, getUserFromCache, setUserInCache } from "@/utils/userByEmailOrId";

// Define the extended AdapterUser interface to match your schema
import { AdapterUser } from "next-auth/adapters";

// This ensures the types align with your database schema
interface ExtendedAdapterUser extends AdapterUser {
  roleId?: string;
  gender?: string;
  phoneNumber?: string;
  password?: string | null;
  salt?: string | null;
}

type DefaultPostgresSchema = {
  usersTable: typeof users;
  accountsTable: typeof accounts;
  sessionsTable?: typeof sessions;
  verificationTokensTable?: typeof verificationTokens;
};

export function CustomDrizzleAdapter(drizzle: typeof db, schema: DefaultPostgresSchema): Adapter {
  const baseAdapter = DrizzleAdapter(drizzle, schema) as Adapter;

  return {
    ...baseAdapter,
    createUser: async (data): Promise<ExtendedAdapterUser> => {
      console.log(data);
      const profileData = await getUserAdditionalInfo(data.access_token!);
      const userData = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        emailVerified: data.email_verified ? new Date() : null,
        image: data.picture,
        gender: profileData.gender!,
        phoneNumber: profileData.phoneNumber || '+91 9999999999',
        password: null,
        salt: null,
        roleId: ROLE_IDS.NEW_USER,
      };
      
      const savedUser = await db.insert(users).values(userData).returning();
      await setUserInCache(savedUser[0]);
      return savedUser[0] as ExtendedAdapterUser;
    },

    getUser: async (id): Promise<ExtendedAdapterUser | null> => {
      const cacheUser = await getUserFromCache(id);
      if (cacheUser) return cacheUser as ExtendedAdapterUser;
      const user = await db.select().from(users).where(eq(users.id, id));
      if (user.length > 0) return user[0] as ExtendedAdapterUser;
      return null;
    },

    getUserByEmail: async (email): Promise<ExtendedAdapterUser | null> => {
      const cacheUser = await getUserFromCache(email);
      if (cacheUser) return cacheUser as ExtendedAdapterUser;
      const user = await db.select().from(users).where(eq(users.email, email));
      if (user.length > 0) return user[0] as ExtendedAdapterUser;
      return null;
    },

    getUserByAccount: async (accountId): Promise<ExtendedAdapterUser | null> => {
      const account = await db.select().from(accounts).where(
        eq(accounts.providerAccountId, accountId.providerAccountId)
      );
      if (account.length > 0) {
        const cacheUser = await getUserFromCache(account[0].userId);
        if (cacheUser) return cacheUser as ExtendedAdapterUser;
        const user = await db.select().from(users).where(eq(users.id, account[0].userId));
        return user[0] as ExtendedAdapterUser;
      }
      return null;
    },

    updateUser: async (user): Promise<ExtendedAdapterUser> => {
      const updatedUser = await db.update(users).set(user).where(eq(users.id, user.id)).returning();
      await setUserInCache(updatedUser[0]);
      return updatedUser[0] as ExtendedAdapterUser;
    },

    deleteUser: async (id) => {
      await db.delete(users).where(eq(users.id, id));
      await deleteUserFromCache(id);
    },

    getSessionAndUser: async (sessionToken) => {
      const session = await db.select().from(sessions).where(eq(sessions.sessionToken, sessionToken));
      if (session.length > 0) {
        const cacheUser = await getUserFromCache(session[0].userId);
        if (cacheUser) return { session: session[0], user: cacheUser as ExtendedAdapterUser };
        const user = await db.select().from(users).where(eq(users.id, session[0].userId));
        return { session: session[0], user: user[0] as ExtendedAdapterUser };
      }
      return null;
    },

    linkAccount: async (account) => {
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(
          eq(accounts.provider, account.provider),
          eq(accounts.userId, account.userId)
        )
        .limit(1);

      if (existingAccount.length > 0) {
        const newAccount = await db
          .update(accounts)
          .set({
            refresh_token: account.refresh_token ?? null,
            access_token: account.access_token ?? null,
            expires_at: account.expires_at ?? null,
            token_type: account.token_type ?? null,
            scope: account.scope ?? null,
            id_token: account.id_token ?? null,
            session_state: account.session_state ?? null,
          })
          .where(
            eq(accounts.provider, account.provider),
            eq(accounts.userId, account.userId)
          ).returning();
        
        return newAccount[0];
      }
      else {
        const newAccount = await db.insert(accounts).values({
          userId: account.userId,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          refresh_token: account.refresh_token ?? null,
          access_token: account.access_token ?? null,
          expires_at: account.expires_at ?? null,
          token_type: account.token_type ?? null,
          scope: account.scope ?? null,
          id_token: account.id_token ?? null,
          session_state: account.session_state ?? null,
        }).returning();

        return newAccount[0];
      }
    },
  };
}