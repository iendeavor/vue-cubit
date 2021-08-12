import { Todo } from "./model";
import { DeepReadonly } from "vue";

const STORAGE_KEY = "todos-vuejs-3.x";

export class TodoStorage {
  uid: number = 0;

  fetch(): DeepReadonly<Todo[]> {
    const todos: DeepReadonly<Todo[]> = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    );
    this.uid = todos.length;
    return todos.map((todo, index) => ({
      id: index,
      title: todo.title,
      completed: todo.completed,
    }));
  }

  save(todos: DeepReadonly<Todo[]>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}

export const todoStorage = new TodoStorage();
