<template>
  <div>
    <div class="todo-header">
      <v-btn-toggle v-model="displayStyle" color="blue darken-3" group>
        <v-btn value="all">すべて</v-btn>

        <v-btn value="complete">完了</v-btn>

        <v-btn value="incomplete">未完了</v-btn>
      </v-btn-toggle>
    </div>
    <v-row style="position: relative">
      <transition-group name="todo-list" tag="div">
        <todo
          v-for="todo in todos"
          :key="todo.id"
          :text="todo.text"
          :todoId="todo.id"
          :isComplete="todo.isComplete"
          class="todo-list-item"
          v-show="isDisplay(todo.isComplete)"
        ></todo>
      </transition-group>
    </v-row>
  </div>
</template>

<script>
import Todo from "@/components/Todo/Todo.vue";
import firebase from "@/firebase";

export default {
  name: "TodoList",

  data: function() {
    return {
      todos: [],
      displayStyle: "all"
    };
  },

  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return;
      }
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("todos")
        .orderBy("createdAt")
        .onSnapshot(querySnapshot => {
          this.todos = [];
          querySnapshot.forEach(ref => {
            const data = ref.data();
            data.id = ref.id;
            this.todos.push(data);
          });
        });
    });
  },

  methods: {
    isDisplay: function(isComplete) {
      if (this.displayStyle === "complete") {
        return isComplete;
      } else if (this.displayStyle === "incomplete") {
        return !isComplete;
      } else {
        return true;
      }
    }
  },

  components: {
    Todo
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  &-item {
    transition: all 0.5s;
    display: inline-block;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transition: opacity 0.5s;
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
