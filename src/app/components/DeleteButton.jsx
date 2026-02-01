import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

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
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <TrashIcon className="amenddb-icon" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent" sideOffset={5}>
                Delete
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </button>
    </form>
  );
}
