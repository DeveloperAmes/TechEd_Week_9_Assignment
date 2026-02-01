import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-90">
      <h1>Welcome to Tiny Wins!</h1>
      <h2 className="border-[#e9b02d] border-4 rounded-md p-2 bio-container">
        The ultimate dopamine boost =
        <br />
        Share your small daily accomplishments to feel good about yourself and
        celebrate other&apos;s wins!
      </h2>
      <h3 className="text-[#d84057] uppercase p-2 mb-2 list">How It Works:</h3>
      <ul className="post-container">
        <li className="post">
          <Image
            src="/assets/flameicon.png"
            alt=""
            width={25}
            height={25}
            className="m-auto mt-2"
          />
          Create a profile and add your small wins each day. You can share more
          than one a day if you like!
        </li>
        <li className="post">
          <Image
            src="/assets/flameicon.png"
            alt=""
            width={25}
            height={25}
            className="m-auto mt-2"
          />
          Your small wins are added to the main feed so others can see what you
          have posted and celebrate with you too!
        </li>
        <li className="post">
          <Image
            src="/assets/flameicon.png"
            alt=""
            width={25}
            height={25}
            className="m-auto mt-2"
          />
          Celebrate others&apos; small wins by liking their posts on the main
          feed.
        </li>
      </ul>
    </main>
  );
}
