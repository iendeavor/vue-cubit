<template>
  <header class="header">
    <h1>todos</h1>
    <div class="replay">
      <button class="undo" @click="todoCubit.undo">Undo</button>
      <button class="redo" @click="todoCubit.redo">Redo</button>
    </div>
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="todoCubit.state.newTodoTitle"
      @keyup.enter="todoCubit.addTodo"
    />
  </header>
  <section class="main" v-show="todoCubit.state.todos.length">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allDone"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li
        v-for="todo in todoCubit.state.filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{
          completed: todo.completed,
          editing: todo.id === todoCubit.state.editedTodo?.id,
        }"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="todo.completed"
            @input="() => todoCubit.toggleTodo(todo.id)"
          />
          <label @dblclick="() => todoCubit.editTodo(todo)">{{
            todo.title
          }}</label>
          <button
            class="destroy"
            @click="() => todoCubit.removeTodo(todo.id)"
          ></button>
        </div>
        <input
          class="edit"
          type="text"
          :value="todoCubit.state.editedTodo?.title"
          @input="handleUpdateEditingTodoTitle"
          @blur="todoCubit.doneEdit"
          @keyup.enter="todoCubit.doneEdit"
          @keyup.escape="todoCubit.cancelEdit"
        />
      </li>
    </ul>
  </section>
  <footer class="footer" v-show="todoCubit.state.todos.length">
    <span class="todo-count">
      <strong>{{ todoCubit.state.remaining }}</strong>
      <span>{{ todoCubit.state.remainingText }}</span>
    </span>
    <ul class="filters">
      <li>
        <a
          href="#/all"
          :class="{ selected: todoCubit.state.visibility === 'all' }"
          >All</a
        >
      </li>
      <li>
        <a
          href="#/active"
          :class="{ selected: todoCubit.state.visibility === 'active' }"
          >Active</a
        >
      </li>
      <li>
        <a
          href="#/completed"
          :class="{
            selected: todoCubit.state.visibility === 'completed',
          }"
          >Completed</a
        >
      </li>
    </ul>

    <button
      class="clear-completed"
      @click="todoCubit.removeCompletedTodos"
      v-show="todoCubit.state.todos.length > todoCubit.state.remaining"
    >
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from "vue";
import { ReplayPlugin } from "@vue-cubit/replay-plugin";
import { HydratedPlugin } from "@vue-cubit/hydrated-plugin";
import { TodoCubit, TodoState, filters } from "../cubit";

export default defineComponent({
  name: "Counter",
  setup: () => {
    const todoCubit = new TodoCubit()
      .use(
        new HydratedPlugin("todoCubit", localStorage, {
          fromJson: TodoState.fromJson,
          toJson: TodoState.toJson,
        })
      )
      .use(new ReplayPlugin<TodoState>());

    const allDone = computed<boolean>({
      set() {
        if (todoCubit.state.allDone) {
          todoCubit.markAllTodosActive();
        } else {
          todoCubit.markAllTodosCompleted();
        }
      },
      get() {
        return todoCubit.state.allDone;
      },
    });

    const handleUpdateEditingTodoTitle = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement)
        todoCubit.updateEditingTodoTitle(target.value);
    };

    onMounted(() => {
      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("hashchange", handleHashChange);
    });

    const handleHashChange = () => {
      const visibility = window.location.hash.replace(/#\/?/, "");

      if (visibility in filters) {
        todoCubit.updateVisibility(visibility as keyof typeof filters);
      } else {
        window.location.hash = "";
        todoCubit.updateVisibility("all");
      }
    };

    return {
      todoCubit,
      allDone,
      handleUpdateEditingTodoTitle,
    };
  },
});
</script>

<style scoped>
.replay {
  width: 100%;
  text-align: right;
}

.replay > .undo,
.replay > .redo {
  margin: 4px 8px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
</style>
