import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { db } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import * as Tooltip from "@radix-ui/react-tooltip";

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
      `UPDATE wk9_user_wins SET user_win_date = $1, users_win = $2 WHERE id = $3`,
      [formValues.user_win_date, formValues.users_win, winId],
    );

    revalidatePath("/feed");
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }

  return (
    <Dialog.Root className="dialog=container">
      <Dialog.Trigger asChild>
        <button>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Pencil1Icon className="amenddb-icon" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  Edit
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit Your Win</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your win here. Click save when you&apos;re done.
          </Dialog.Description>
          <form>
            <label htmlFor="user_win_date">Win Date:</label>
            <input type="date" name="user_win_date" required></input>
            <label htmlFor="users_win">Your Win:</label>
            <input
              type="text"
              name="users_win"
              required
              defaultValue={data.users_win}
            ></input>
          </form>
          <div>
            <Dialog.Close asChild>
              <button
                type="submit"
                formAction={handleEdit}
                className="form-btn"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button aria-label="Close">
              <Cross2Icon className="close-icon" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
