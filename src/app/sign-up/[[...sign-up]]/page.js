import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <h1>Never been here before? Sign up to start sharing your small wins!</h1>
      <SignUp />
    </>
  );
}
