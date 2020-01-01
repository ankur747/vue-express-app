/* eslint-disable no-unused-vars */
import axios from "axios";

const state = {
  todos: []
};
const getters = {
  allTodos: state => state.todos
};
const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(e.target.value);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );
    commit("updateTodo", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, complted: false }
    );
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    // console.log("deleting");
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  }
};
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => id !== todo.id)),
  updateTodo: (state, updatedTodo) => {
    const currIndex = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (currIndex !== -1) {
      state.todos.splice(currIndex, 1, updatedTodo);
    }
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
