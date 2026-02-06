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

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id) as any);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-error bg-error/10 border-error/10 flex items-center gap-1 rounded-lg border p-1 px-2">
          <HugeiconsIcon icon={Delete02Icon} size={17} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="text-text text-sm">
          <strong>Task:</strong> {todo.todo}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <button
            onClick={handleDeleteTodo}
            className="rounded-lg bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodo;
