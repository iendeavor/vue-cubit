import { DeepReadonly } from "vue";
import { Todo } from ".";

export const filters = {
  all(todos: readonly Todo[]) {
    return todos;
  },
  active(todos: readonly Todo[]) {
    return todos.filter((todo) => {
      return !todo.completed;
    });
  },
  completed(todos: readonly Todo[]) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  },
};

function pluralize(n: number) {
  return n === 1 ? " item" : " items";
}

export class TodoState {
  todos: DeepReadonly<Todo[]>;
  newTodoTitle: Todo["title"];
  editedTodo?: DeepReadonly<Todo>;
  visibility: keyof typeof filters;
  get remaining(): number {
    return filters.active(this.todos).length;
  }
  get remainingText(): String {
    return `${pluralize(this.remaining)} left`;
  }
  get filteredTodos(): DeepReadonly<Todo[]> {
    return filters[this.visibility](this.todos);
  }
  get allDone(): boolean {
    return this.remaining === 0;
  }

  constructor({
    todos,
    newTodoTitle,
    editedTodo,
    visibility,
  }: {
    todos?: DeepReadonly<Todo[]>;
    newTodoTitle?: Todo["title"];
    editedTodo?: DeepReadonly<Todo>;
    visibility?: keyof typeof filters;
  }) {
    this.todos = todos ?? [];
    this.newTodoTitle = newTodoTitle ?? "";
    this.editedTodo = editedTodo;
    this.visibility = visibility ?? "all";
  }

  copyWith({
    todos,
    newTodoTitle,
    editedTodo,
    visibility,
  }: {
    todos?: DeepReadonly<Todo[]>;
    newTodoTitle?: Todo["title"];
    editedTodo?: DeepReadonly<Todo> | null;
    visibility?: keyof typeof filters;
  }) {
    return new TodoState({
      todos: todos ?? this.todos.map((todo) => todo.copyWith({})),
      newTodoTitle: newTodoTitle ?? this.newTodoTitle,
      editedTodo: editedTodo == null ? undefined : editedTodo.copyWith({}),
      visibility: visibility ?? this.visibility,
    });
  }

  static fromJson(json: string): TodoState {
    const object = JSON.parse(json);
    return new TodoState({
      todos: (object["todos"] as string[]).map((todoJson) =>
        Todo.fromJson(todoJson)
      ),
      newTodoTitle: object["newTodoTitle"],
      editedTodo: object["editedTodo"],
      visibility: object["visibility"],
    });
  }

  static toJson(instance: TodoState): string {
    return JSON.stringify({
      todos: instance.todos.map((todoInstance) => Todo.toJson(todoInstance)),
      newTodoTitle: instance.newTodoTitle,
      editedTodo: instance.editedTodo,
      visibility: instance.visibility,
    });
  }
}
