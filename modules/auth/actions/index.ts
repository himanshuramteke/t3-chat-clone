"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { CurrentUserResult } from "./types";

export const getCurrentUser = async (): Promise<CurrentUserResult> => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    let dbUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        clerkId: true,
      },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          name: user.firstName || "",
          image: user.imageUrl || "",
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          clerkId: true,
        },
      });
    }

    return dbUser;
  } catch (error: unknown) {
    console.error("❌ Error fetching current user:", error);
    return null;
  }
};
