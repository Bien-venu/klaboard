import Filter from "@/components/Filter";
import PageHeader from "@/components/PageHeader";
import { SiteHeader } from "@/components/site-header";
import { fetchTodos } from "@/features/ToDo/todoThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { fetchUser } from "@/features/users/userThunks";
import Kanban from "@/components/Kanban";
import List from "@/components/List";
import Calendar from "@/components/Calendar";
import { ClipLoader } from "react-spinners";

export default function HumanResources() {
  const dispatch = useAppDispatch();

  const todoList = useSelector((state: RootState) => state.todo.todos);
  const userList = useSelector((state: RootState) => state.user.users);

  const [filter, setFilter] = useState("kanban");

  const userLoading = useSelector((state: RootState) => state.user.loading);
  const todoLoading = useSelector((state: RootState) => state.todo.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (!todoList.length) return;

    const uniqueUserIds = [...new Set(todoList.map((t) => t.userId))];

    uniqueUserIds.forEach((id) => {
      dispatch(fetchUser(id));
    });
  }, [todoList, dispatch]);

  console.log(todoList);
  console.log(userList);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden py-4">
        <PageHeader />
        <Filter filter={filter} setFilter={setFilter} />
        <div className="h-full w-full overflow-hidden px-4 lg:px-6">
          {todoLoading || userLoading ? (
            <div className="bg-background border-text/10 flex h-full w-full items-center justify-center rounded-xl border p-4">
              <ClipLoader
                color={"#9771fe"}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="flex h-full w-full overflow-hidden">
              {filter === "kanban" && (
                <Kanban todoList={todoList} />
              )}
              {filter === "list" && <List />}
              {filter === "calendar" && <Calendar />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
