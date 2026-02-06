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

  const [todoText, setTodoText] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.completed);

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

  const handleUpdateTodo = () => {
    if (!todoText.trim()) return;

    dispatch(
      updateTodo({
        id: todo.id,
        completed,
      }) as any,
    );
  };

  const isDisabled = !todoText.trim();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-done bg-done/10 border-done/10 flex items-center gap-1 rounded-lg border p-1 px-2">
          <HugeiconsIcon icon={TaskEdit01Icon} size={17} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Task</AlertDialogTitle>
          <AlertDialogDescription>
            Update the details below and save changes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter todo text"
            className="border-text/10 w-full rounded-md border p-2 px-3 text-sm"
            readOnly
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Mark as completed
          </label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <button
            onClick={handleUpdateTodo}
            disabled={isDisabled}
            className={`rounded-lg px-4 py-1.5 text-sm text-white ${
              isDisabled
                ? "cursor-not-allowed bg-gray-400"
                : "bg-special hover:bg-special/90"
            }`}
          >
            Update
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTodo;
