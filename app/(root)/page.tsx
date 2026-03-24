import { getCurrentUser } from "@/modules/auth/actions";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton />
    </div>
  );
}
