import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Footer({ params }) {
  const { userId } = await auth();
  return (
    <footer className="text-center">
      <nav className="flex justify-between">
        <Link href={`/profile/${userId}/create-post`}>
          <PlusIcon aria-label="add a new win" />
        </Link>
        <Link href={`/profile/${userId}`}>
          <PersonIcon aria-label="profile page" />
        </Link>
      </nav>
      <p>DeveloperAmes &copy; 2026</p>
    </footer>
  );
}
