import { Cubit } from "@vue-cubit/core";
import { Todo, TodoState, filters } from ".";

export class TodoCubit extends Cubit<TodoState> {
  constructor() {
    super(new TodoState({}));
  }

  updateNewTodoTitle(title: string) {
    this.emit(
      this.state.copyWith({
        newTodoTitle: title,
      })
    );
  }

  addTodo() {
    const newTitle = this.state.newTodoTitle.trim();
    if (newTitle === "") return;

    this.emit(
      this.state.copyWith({
        newTodoTitle: "",
        todos: this.state.todos.concat({
          id: this.state.todos.length,
          title: newTitle,
          completed: false,
        }),
      })
    );
  }

  editTodo(todo: Todo) {
    this.emit(
      this.state.copyWith({
        editedTodo: todo,
      })
    );
  }

  updateEditingTodoTitle(title: string) {
    if (this.state.editedTodo === undefined) return;

    this.emit(
      this.state.copyWith({
        editedTodo: {
          id: this.state.editedTodo.id,
          title: title,
          completed: this.state.editedTodo.completed,
        },
      })
    );
  }

  doneEdit() {
    if (this.state.editedTodo === undefined) return;

    const originalTodo = this.state.todos.find(
      (todo) => todo.id === this.state.editedTodo!.id
    )!;

    const editedTodo = {
      id: this.state.editedTodo.id,
      title: this.state.editedTodo.title.trim() || originalTodo.title,
      completed: this.state.editedTodo.completed,
    };

    this.emit(
      this.state.copyWith({
        editedTodo: null,
        todos: this.state.todos.reduce((todos, todo) => {
          if (todo.id === editedTodo?.id) {
            todo = editedTodo;
          }
          return todos.concat(todo);
        }, [] as Todo[]),
      })
    );
  }

  cancelEdit() {
    this.emit(
      this.state.copyWith({
        editedTodo: null,
      })
    );
  }

  toggleTodo(id: Todo["id"]) {
    this.emit(
      this.state.copyWith({
        todos: this.state.todos.reduce((todos, todo) => {
          if (todo.id === id) {
            todo = {
              id: todo.id,
              title: todo.title,
              completed: !todo.completed,
            };
          }
          return todos.concat(todo);
        }, [] as Todo[]),
      })
    );
  }

  markAllTodosCompleted() {
    this.emit(
      this.state.copyWith({
        todos: this.state.todos.map((todo) => ({
          ...todo,
          completed: true,
        })),
      })
    );
  }

  markAllTodosActive() {
    this.emit(
      this.state.copyWith({
        todos: this.state.todos.map((todo) => ({
          ...todo,
          completed: false,
        })),
      })
    );
  }

  updateVisibility(visibility: keyof typeof filters) {
    this.emit(
      this.state.copyWith({
        visibility: visibility,
      })
    );
  }

  removeTodo(id: Todo["id"]) {
    this.emit(
      this.state.copyWith({
        todos: this.state.todos.filter((t) => t.id !== id),
      })
    );
  }

  removeCompletedTodos() {
    this.emit(
      this.state.copyWith({
        todos: filters.active(this.state.todos),
      })
    );
  }
}
