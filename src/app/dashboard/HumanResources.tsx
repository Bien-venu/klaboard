import Filter from "@/components/Filter";
import PageHeader from "@/components/PageHeader";
import { SiteHeader } from "@/components/site-header";
import { fetchTodos } from "@/features/ToDo/todoThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { fetchUser } from "@/features/users/userThunks";

export default function HumanResources() {
  const dispatch = useAppDispatch();

  const todoList = useSelector((state: RootState) => state.todo.todos);
  const userList = useSelector((state: RootState) => state.user.user);

  const userLoading = useSelector((state: RootState) => state.user.loading);
  const todoLoading = useSelector((state: RootState) => state.todo.loading);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchUser(12));
  }, [dispatch]);

  console.log(todoList);
  console.log(userList);
  console.log(userLoading);
  console.log(todoLoading);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-auto py-4">
        <PageHeader />
        <Filter />
        <div className="flex h-full w-full px-4 lg:px-6">
          <div className="flex h-full w-full bg-amber-950"></div>
        </div>
      </div>
    </div>
  );
}
