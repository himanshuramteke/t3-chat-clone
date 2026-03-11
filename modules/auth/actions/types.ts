import type { User } from "@prisma/client";

export type CurrentUserResult = Pick<
  User,
  "id" | "email" | "name" | "image" | "clerkId"
> | null;
