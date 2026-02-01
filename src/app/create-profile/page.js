import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  const { userId } = await auth();
  const user = await currentUser();
  console.log(userId);
  console.log(user);
  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      user_id: rawFormData.get("user_id"),
      first_name: rawFormData.get("first_name"),
      last_name: rawFormData.get("last_name"),
      bio: rawFormData.get("bio"),
    };

    try {
      await db.query(
        `INSERT INTO wk9_users (user_id, first_name, last_name, bio) VALUES ($1, $2, $3, $4)`,
        [
          formValues.user_id,
          formValues.first_name,
          formValues.last_name,
          formValues.bio,
        ],
      );
    } catch (error) {
      console.error(error);
    }
    revalidatePath(`profile/${userId}`);
    redirect(`profile/${userId}`);
  }

  return (
    <section>
      <h1>
        Welcome to Tiny Wins, {user.firstName} {user.lastName}!
      </h1>
      <h2>Finish creating your profile to start sharing your wins!</h2>
      <form action={handleSubmit}>
        <label htmlFor="user_id"></label>
        <input type="hidden" name="user_id" value={userId} />
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          maxLength={255}
          name="first_name"
          defaultValue={user.firstName}
          required
        ></input>
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          maxLength={255}
          name="last_name"
          defaultValue={user.lastName}
          required
        ></input>
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" />
        <button className="form-btn">Submit</button>
      </form>
    </section>
  );
}
