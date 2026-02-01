import { db } from "@/utils/dbConnect";
import { FaceIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const { rows } = await db.query(
    `SELECT * FROM wk9_user_wins ORDER BY user_win_date DESC`,
  );
  const query = await db.query(`SELECT * FROM wk9_users`);
  const data = query.rows;
  console.log(data);

  // async function handleLike() {
  //   "use server";
  // }

  // db.query(`UPDATE wk9_user_wins SET likes + 1 = WHERE id = $1`, []);

  // revalidatePath("/feed");
  // redirect("/feed");

  return (
    <section>
      <h1 className="uppercase">Feed</h1>
      {rows.map((win) => {
        const winDate = win.user_win_date.toString().slice(0, 15);
        return (
          <ul key={win.id} className="post-container">
            <li className="post">
              {winDate}
              <br />
              {data.map((user) => {
                if (user.user_id == win.users_id) {
                  return `${user.first_name} ${user.last_name}`;
                }
              })}{" "}
              shared...
              <br />
              &quot;{win.users_win}&quot;
              <br />
              <button>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <FaceIcon className="like-icon m-auto" />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="TooltipContent"
                        sideOffset={5}
                      >
                        Like
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </button>
              {win.likes}
            </li>
          </ul>
        );
      })}
    </section>
  );
}
