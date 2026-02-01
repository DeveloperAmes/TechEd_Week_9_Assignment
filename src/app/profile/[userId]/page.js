import { db } from "@/utils/dbConnect";
import { notFound } from "next/navigation";
import EditPostDialog from "@/app/components/EditPostDialog";
import DeleteButton from "@/app/components/DeleteButton";
import Image from "next/image";

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
        <h1 className="prof-h1 p-2 mb-4 uppercase">
          {data.first_name}&apos;s Profile
        </h1>
        <div className="flex-col h-23">
          <h2 className="mb-2">
            {data.first_name} {data.last_name}
          </h2>
          <h2>Bio:</h2>
          <h3 className="bio-container border-[#e9b02d] border-4 rounded-md p-4 w-full m-auto">
            {data.bio}
          </h3>
        </div>
      </section>
      <section className="mt-20">
        <h3 className="text-[#d84057] bg-white p-2 mb-2 uppercase">
          Your Tiny Wins
        </h3>
        {usersWins.map((win, index) => {
          const winDate = win.user_win_date.toString().slice(0, 15);
          return (
            <div key={index} className="post-container">
              <p className="post">
                <Image
                  src="/assets/flameicon.png"
                  alt=""
                  width={25}
                  height={25}
                  className="m-auto mt-2"
                />
                {winDate}
                <br />
                {win.users_win}
              </p>
              <div className=" w-20 m-auto flex justify-center gap-2">
                <EditPostDialog winId={win.id} userId={win.users_id} />
                <DeleteButton winId={win.id} userId={userId} />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
