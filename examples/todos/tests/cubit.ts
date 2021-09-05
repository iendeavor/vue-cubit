import { TodoCubit, TodoState } from "../src/todo/cubit";
import { cubitTest } from "@vue-cubit/cubit";

describe("TodoCubit", () => {
  let todoCubit: TodoCubit;

  beforeEach(() => {
    todoCubit = new TodoCubit();
  });

  cubitTest<TodoCubit, TodoState>("it emit [] when nothing added", {
    build: () => todoCubit,
    expect: () => [],
  });

  cubitTest<TodoCubit, TodoState>("it can add new todo", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.updateNewTodoTitle("foo");
      cubit.addTodo();
    },
    expect: () => [
      new TodoState({ newTodoTitle: "foo" }),
      new TodoState({ todos: [{ id: 0, title: "foo", completed: false }] }),
    ],
  });

  cubitTest<TodoCubit, TodoState>(
    "it cannot add new todo when title is empty string",
    {
      build: () => todoCubit,
      act: (cubit) => {
        cubit.addTodo();
      },
      expect: () => [],
    }
  );

  cubitTest<TodoCubit, TodoState>("it can edit todo", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({ todos: [{ id: 0, title: "foo", completed: false }] }),
    act: (cubit) => {
      cubit.editTodo({ id: 0, title: "foo", completed: false });
      cubit.updateEditingTodoTitle("bar");
      cubit.doneEdit();
    },
    expect: () => [
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
        editedTodo: { id: 0, title: "foo", completed: false },
      }),
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
        editedTodo: { id: 0, title: "bar", completed: false },
      }),
      new TodoState({
        todos: [{ id: 0, title: "bar", completed: false }],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>(
    "it cannot update editing todo title when editing todo is empty",
    {
      build: () => todoCubit,
      act: (cubit) => {
        cubit.updateEditingTodoTitle("foo");
      },
      expect: () => [],
    }
  );

  cubitTest<TodoCubit, TodoState>(
    "it cannot update editing todo when editing todo is empty",
    {
      build: () => todoCubit,
      act: (cubit) => {
        cubit.doneEdit();
      },
      expect: () => [],
    }
  );

  cubitTest<TodoCubit, TodoState>(
    "it should restore original title when edited todo title is empty string",
    {
      build: () => todoCubit,
      seed: () =>
        new TodoState({ todos: [{ id: 0, title: "foo", completed: false }] }),
      act: (cubit) => {
        cubit.editTodo({ id: 0, title: "foo", completed: false });
        cubit.updateEditingTodoTitle("");
        cubit.doneEdit();
      },
      expect: () => [
        new TodoState({
          todos: [{ id: 0, title: "foo", completed: false }],
          editedTodo: { id: 0, title: "foo", completed: false },
        }),
        new TodoState({
          todos: [{ id: 0, title: "foo", completed: false }],
          editedTodo: { id: 0, title: "", completed: false },
        }),
        new TodoState({
          todos: [{ id: 0, title: "foo", completed: false }],
        }),
      ],
    }
  );

  cubitTest<TodoCubit, TodoState>("it can cancel editing", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({ todos: [{ id: 0, title: "foo", completed: false }] }),
    act: (cubit) => {
      cubit.editTodo({ id: 0, title: "foo", completed: false });
      cubit.updateEditingTodoTitle("bar");
      cubit.cancelEdit();
    },
    expect: () => [
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
        editedTodo: { id: 0, title: "foo", completed: false },
      }),
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
        editedTodo: { id: 0, title: "bar", completed: false },
      }),
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can change visibility", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.updateVisibility("active");
    },
    expect: () => [
      new TodoState({
        visibility: "active",
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can toggle todo", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: false }],
      }),
    act: (cubit) => {
      cubit.toggleTodo(0);
    },
    expect: () => [
      new TodoState({
        todos: [{ id: 0, title: "foo", completed: true }],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can mark all todos completed", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: true },
          { id: 1, title: "bar", completed: false },
        ],
      }),
    act: (cubit) => {
      cubit.markAllTodosCompleted();
    },
    expect: () => [
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: true },
          { id: 1, title: "bar", completed: true },
        ],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can mark all todos active", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: true },
          { id: 1, title: "bar", completed: false },
        ],
      }),
    act: (cubit) => {
      cubit.markAllTodosActive();
    },
    expect: () => [
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: false },
          { id: 1, title: "bar", completed: false },
        ],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can remove completed todos", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: true },
          { id: 1, title: "bar", completed: false },
        ],
      }),
    act: (cubit) => {
      cubit.removeCompletedTodos();
    },
    expect: () => [
      new TodoState({
        todos: [{ id: 1, title: "bar", completed: false }],
      }),
    ],
  });

  cubitTest<TodoCubit, TodoState>("it can remove todo", {
    build: () => todoCubit,
    seed: () =>
      new TodoState({
        todos: [
          { id: 0, title: "foo", completed: true },
          { id: 1, title: "bar", completed: false },
        ],
      }),
    act: (cubit) => {
      cubit.removeTodo(0);
    },
    expect: () => [
      new TodoState({
        todos: [{ id: 1, title: "bar", completed: false }],
      }),
    ],
  });
});
