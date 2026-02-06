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

const AddTodos = () => {
  const dispatch = useAppDispatch();

  const [selectedUser, setSelectedUser] = useState("");
  const [todoText, setTodoText] = useState("");
  const [completed, setCompleted] = useState(false);

  const userList = useSelector((state: RootState) => state.user.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (!selectedUser || !todoText.trim()) return;

    dispatch(
      addTodo({
        todo: todoText,
        completed,
        userId: Number(selectedUser),
      }),
    );

    // optional: reset form after save
    setTodoText("");
    setSelectedUser("");
    setCompleted(false);
  };

  // disable if required inputs are empty
  const isDisabled = !todoText.trim() || !selectedUser;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:bg-special/90 bg-special flex cursor-pointer items-center justify-center gap-1 rounded-lg p-1.5 px-3 text-sm text-white">
          <HugeiconsIcon icon={AddIcon} size={20} /> <span>New Tasks</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Tasks</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new task.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4">
          {/* Todo text input */}
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter todo text"
            className="border-text/10 w-full rounded-md border p-2 px-3 text-sm"
          />

          {/* Completed checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Mark as completed
          </label>

          {/* User selection */}
          <ComboBox
            options={userList.map((lv) => ({
              value: lv.id.toString(),
              label: `${lv.firstName} ${lv.lastName}`,
            }))}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select user"
            className="h-full w-full p-3"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Close
          </AlertDialogCancel>

          <button
            onClick={handleAddTodo}
            disabled={isDisabled}
            className={`rounded-lg px-4 py-1.5 text-sm text-white ${
              isDisabled
                ? "cursor-not-allowed bg-gray-400"
                : "bg-special hover:bg-special/90"
            }`}
          >
            Save
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTodos;
