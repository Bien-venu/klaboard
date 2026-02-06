export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodoItem = {
  column: "To-do" | "On Progress" | "Need Review" | "Done";
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};