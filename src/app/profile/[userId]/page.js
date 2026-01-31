import { db } from "@/utils/dbConnect";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserProfile({ params }) {
  const { userId } = await params;
  const userData = await db.query(
    `SELECT * FROM wk9_users WHERE user_id = $1`,
    [userId],
  );
  const data = userData.rows[0];

  const winData = await db.query(
    `SELECT * FROM wk9_user_wins WHERE users_id = $1`,
    [userId],
  );
  const usersWins = winData.rows;

  if (userData.rows.length === 0) {
    notFound();
  }

  return (
    <>
      <section>
        <h1>{data.first_name}&apos;s Profile</h1>
        <h2>
          {data.first_name} {data.last_name}
        </h2>
        <h3>{data.bio}</h3>
      </section>
      <section>
        <h3>My Tiny Wins</h3>
        <Link href={`/profile/${userId}/create-post`}>Add a new win!</Link>
        {usersWins.map((win, index) => {
          const winDate = win.user_win_date.toString().slice(0, 15);
          return (
            <div key={index}>
              <p>{winDate}</p>
              <p>{win.users_win}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}
