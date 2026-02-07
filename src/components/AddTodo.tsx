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
import { fetchUsers } from "@/features/users/userThunks";
import { addTodo } from "@/features/ToDo/todoThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ComboBox from "./ComboBox";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddIcon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";

const AddTodos = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [selectedUser, setSelectedUser] = useState("");
  const [todoText, setTodoText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const userList = useSelector((state: RootState) => state.user.list);
  const usersloading = useSelector((state: RootState) => state.user.loading);

  const usersReady = !usersloading && userList.length > 0;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (!selectedUser || !todoText.trim()) return;
    setLoading(true);
    try {
      await dispatch(
        addTodo({ todo: todoText, completed, userId: Number(selectedUser) }),
      );
      setTodoText("");
      setSelectedUser("");
      setCompleted(false);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !todoText.trim() || !selectedUser || !usersReady || loading;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div
          data-testid="add-todo-trigger"
          className="hover:bg-special/90 bg-special flex cursor-pointer items-center justify-center gap-1 rounded-lg p-1.5 px-3 text-sm text-white"
        >
          <HugeiconsIcon icon={AddIcon} size={20} />
          <span>{t("addTodo.trigger")}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addTodo.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("addTodo.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder={t("addTodo.placeholder.todo")}
            className="border-text/10 w-full rounded-md border p-2 px-3 text-sm"
            data-testid="todo-input"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            {t("addTodo.markAsCompleted")}
          </label>

          <ComboBox
            options={userList.map((lv) => ({
              value: lv.id.toString(),
              label: `${lv.firstName} ${lv.lastName}`,
            }))}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder={t("addTodo.placeholder.user")}
            className="h-full w-full p-3"
            disabled={!usersReady}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t("common.close")}
          </AlertDialogCancel>

          <button
            onClick={handleAddTodo}
            disabled={isDisabled}
            className={`!disabled:cursor-pointer flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm text-white ${isDisabled ? "cursor-not-allowed bg-gray-400" : "bg-special hover:bg-special/90"}`}
            data-testid="add-todo-btn"
          >
            {loading && (
              <ClipLoader
                color={"#ffffff"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            {t("common.save")}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTodos;
