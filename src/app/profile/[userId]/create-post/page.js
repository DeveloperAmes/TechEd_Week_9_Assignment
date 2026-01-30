import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  const { userId } = await auth();
  const user = await currentUser();
  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      post_date: rawFormData.get("user_win_date"),
      users_win: rawFormData.get("users_win"),
      users_id: userId,
    };
    try {
      const formData = await db.query(
        `INSERT INTO wk9_user_wins (user_win_date, users_win, users_id) VALUES ($1, $2, $3)`,
        [formValues.post_date, formValues.users_win, formValues.users_id],
      );
    } catch (error) {
      console.error(error);
    }
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }
  return (
    <section>
      <h1>{user.firstName}, create a post to share your wins!</h1>
      <form action={handleSubmit}>
        <label htmlFor="user_win_date">Today&apos;s Date:</label>
        <input type="date" name="user_win_date" required />
        <label htmlFor="users_win">Share your win:</label>
        <input type="text" name="users_win" required></input>
        <button>Add post</button>
      </form>
    </section>
  );
}
