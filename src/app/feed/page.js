import { db } from "@/utils/dbConnect";

export default async function FeedPage() {
  const { rows } = await db.query(
    `SELECT * FROM wk9_user_wins ORDER BY user_win_date DESC`,
  );
  return (
    <>
      <h1>Feed</h1>
      {rows.map((win) => {
        const winDate = win.user_win_date.toString().slice(0, 15);
        return (
          <ul key={win.id}>
            <li className="border-[#d84057] border-2">
              {winDate}
              <br />
              {win.users_win}
            </li>
          </ul>
        );
      })}
    </>
  );
}
