/* eslint-disable @typescript-eslint/no-explicit-any */

import type { RootState } from "@/app/store";
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
import { updateTodo } from "@/features/ToDo/todoThunks";
import { fetchUsers } from "@/features/users/userThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { TaskEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";

type EditTodoProps = {
  todo: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  };
};

const EditTodo = ({ todo }: EditTodoProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [todoText, setTodoText] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.completed);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const userList = useSelector((state: RootState) => state.user.list);

  useEffect(() => {
    setTodoText(todo.todo);
    setCompleted(todo.completed);
  }, [todo]);

  useEffect(() => {
    if (!userList.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userList.length]);

  const handleUpdateTodo = async () => {
    if (!todoText.trim()) return;
    setLoading(true);
    try {
      await dispatch(updateTodo({ id: todo.id, completed }) as any);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="text-done bg-done/10 border-done/10 flex items-center gap-1 rounded-lg border p-1 px-2">
          <HugeiconsIcon icon={TaskEdit01Icon} size={17} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("editTodo.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("editTodo.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder={t("addTodo.placeholder.todo")}
            className="border-text/10 w-full rounded-md border p-2 px-3 text-sm"
            readOnly
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            {t("editTodo.markAsCompleted")}
          </label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t("common.cancel")}
          </AlertDialogCancel>

          <button
            onClick={handleUpdateTodo}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-white ${loading ? "cursor-not-allowed bg-gray-400" : "bg-special hover:bg-special/90"}`}
            data-testid="update-btn"
          >
            {loading && (
              <ClipLoader
                color={"#ffffff"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            {t("common.update")}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTodo;
