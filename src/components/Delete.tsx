/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTodo } from "@/features/ToDo/todoThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Delete02Icon } from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";

type DeleteTodoProps = {
  todo: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  };
};

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteTodo = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTodo(todo.id) as any);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div
          data-testid="delete-todo-trigger"
          className="text-error bg-error/10 border-error/10 flex items-center gap-1 rounded-lg border p-1 px-2"
        >
          <HugeiconsIcon icon={Delete02Icon} size={17} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteTodo.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteTodo.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="text-text text-sm">
          <strong>{t("deleteTodo.taskLabel")}</strong> {todo.todo}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t("common.cancel")}
          </AlertDialogCancel>

          <button
            onClick={handleDeleteTodo}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-red-700"}`}
            data-testid="delete-btn"
          >
            {loading && (
              <ClipLoader
                color={"#ffffff"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            {t("common.delete")}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodo;
