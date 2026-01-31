import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default async function EditPostDialog({ winId, userId }) {
  const getQuery = await db.query(`SELECT * FROM wk9_user_wins WHERE id = $1`, [
    winId,
  ]);
  const data = getQuery.rows[0];
  console.log(data);

  async function handleEdit(rawFormData) {
    "use server";
    const formValues = {
      user_win_date: rawFormData.get("user_win_date"),
      users_win: rawFormData.get("users_win"),
    };

    db.query(
      `UPDATE wk9_user_wins SET user_win_date = $1, users_win = $2 WHERE users_id = $3`,
      [formValues.user_win_date, formValues.users_win, winId],
    );

    revalidatePath("/feed");
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="edit-post-btn">
          <Pencil1Icon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit post</Dialog.Title>
          <Dialog.Description>
            Make changes to your win here. Click save when you&apos;re done
          </Dialog.Description>
          <label htmlFor="user_win_date">Share your win:</label>
          <input type="date" name="user_win_date" required></input>
          <label htmlFor="users_win">Share your win:</label>
          <input
            type="text"
            name="users_win"
            required
            defaultValue={data.users_win}
          ></input>
          <div>
            <Dialog.Close asChild>
              <button type="submit" formAction={handleEdit}>
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
