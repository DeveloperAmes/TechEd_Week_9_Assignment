import { PersonIcon, PlusIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Footer({ params }) {
  const { userId } = await auth();
  return (
    <footer className="text-center bg-[#d84057] pt-1">
      <nav className="flex justify-between bg-white pt-2">
        <Link
          href={"/feed"}
          className="flex-col items-center justify-items-center ml-10"
        >
          <HomeIcon aria-label="home" className="footer-icon" />
          Home
        </Link>
        <Link
          href={`/profile/${userId}/create-post`}
          className="flex-col items-center justify-items-center"
        >
          <PlusIcon aria-label="add a new win" className="footer-icon" />
          Add Win
        </Link>
        <Link
          href={`/profile/${userId}`}
          className="flex-col items-center justify-items-center mr-10"
        >
          <PersonIcon aria-label="profile page" className="footer-icon" />
          Profile
        </Link>
      </nav>
      <p className="text-white">DeveloperAmes &copy; 2026</p>
    </footer>
  );
}
