import { redis } from "@/lib/redis";
import { User } from "next-auth";

export async function getUserFromCache(identifier: string) {
    try {
        const keys = await redis.keys(`users:*:${identifier}`) || await redis.keys(`users:${identifier}:*`);
        
        if (keys.length > 0) {
            const user = await redis.get(keys[0]) as User; // Get the first matched key
            return user;
        }
    } catch (error) {
        console.error("Error fetching user from cache:", error);
    }
}

export async function setUserInCache(user: User, ttl: number = 604800) {
    try {
        if (!user || !user.id || !user.email) {
            console.warn("Invalid user object provided for caching.");
            return;
        }

        const key = `users:${user.id}:${user.email}`;
        await redis.set(key, JSON.stringify(user), { ex: ttl });
    } catch (error) {
        console.error("Error setting user in cache:", error);
    }
}

export async function deleteUserFromCache(id: string) {
    try {
        const keys = await redis.keys(`users:${id}:*`);

        if (keys.length > 0) {
            await redis.del(keys[0]); // Delete the first matched key
        }
    } catch (error) {
        console.error("Error deleting user from cache:", error);
    }
}