<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div
        class="todo"
        v-for="todo in allTodos"
        v-bind:key="todo.id"
        @dblclick="onDblClick(todo)"
        v-bind:class="{ 'is-complete': todo.completed }"
      >
        {{ todo.title }}
        <div class="del" @click="deleteTodo(todo.id)">
          <h4>X</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updatedTodo = {
        title: todo.title,
        id: todo.id,
        completed: !todo.completed
      };
      this.updateTodo(updatedTodo);
    }
  },
  computed: mapGetters(["allTodos"]),
  // eslint-disable-next-line no-dupe-keys
  created() {
    this.fetchTodos();
  }
};
</script>
<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
.del {
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.del:hover {
  background-color: rebeccapurple;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
