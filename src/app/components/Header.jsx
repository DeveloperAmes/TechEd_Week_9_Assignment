import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-end justify-between">
      <div className="m-auto">
        <Link href={"/"}>
          <Image
            src="/assets/tinywinslogo.png"
            width={130}
            height={130}
            alt=""
          />
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton className="user-btn" />
          <SignUpButton className="user-btn" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
