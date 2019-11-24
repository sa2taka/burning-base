<template>
  <v-col class="todo mx-auto">
    <todo-editor></todo-editor>
    <todo-list class="mt-10"></todo-list>
  </v-col>
</template>

<script>
import TodoList from "../components/Todo/TodoList.vue";
import TodoEditor from "../components/Todo/Editor.vue";

export default {
  name: "TodoPage",

  components: {
    TodoList,
    TodoEditor
  }
};
</script>

<style lang="scss" scoped>
.todo {
  width: 80%;
}
</style>
