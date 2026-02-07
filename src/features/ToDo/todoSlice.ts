import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todoThunks";
import type { Todo } from "@/types/todo";

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })

      .addCase(
        updateTodo.fulfilled,
        (
          state,
          action: PayloadAction<Partial<Todo> & { id: number | string }>,
        ) => {
          const index = state.todos.findIndex(
            (t) => t.id === action.payload.id,
          );
          if (index !== -1) {
            state.todos[index] = {
              ...state.todos[index],
              ...action.payload,
            };
          }
        },
      )

      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload.id);
      });
  },
});

export default todoSlice.reducer;
