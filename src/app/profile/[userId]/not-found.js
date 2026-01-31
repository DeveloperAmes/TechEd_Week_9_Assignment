import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <>
      <h1>Sorry...</h1>
      <p>We couldn&apos;t find the person you were looking for</p>
      <Link href={"/feed"}>Return to the feed</Link>
    </>
  );
}
