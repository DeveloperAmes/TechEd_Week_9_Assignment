import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteButton({ winId, userId }) {
  async function handleDelete() {
    "use server";
    const deleteWin = await db.query(
      `DELETE FROM wk9_user_wins WHERE id = $1`,
      [winId],
    );
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }
  return (
    <form action={handleDelete}>
      <button type="submit">
        <TrashIcon />
      </button>
    </form>
  );
}
