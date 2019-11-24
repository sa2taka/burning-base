<template>
  <v-card class="pl-5 pr-7 pt-3 pb-2 ml-4 mt-3 todo">
    <v-row>
      <v-btn dark icon small color="green darken-1" @click="toggleComplete">
        <v-icon small dark>{{
          isComplete ? "mdi-check-box-outline" : "mdi-checkbox-blank-outline"
        }}</v-icon>
      </v-btn>

      <p class="my-auto ml-4">{{ text }}</p>

      <v-btn
        dark
        icon
        small
        color="red darken-1"
        class="ml-4"
        @click="deleteTodo"
      >
        <v-icon small dark>mdi-delete</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "todo",

  data: function() {
    return {};
  },

  props: {
    text: {
      required: true
    },
    todoId: {
      required: true
    },
    isComplete: {
      required: true
    }
  },

  methods: {
    deleteTodo: function() {
      const user = firebase.auth().currentUser;

      if (!user) {
        return;
      }
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("todos")
        .doc(this.todoId)
        .delete();
    },
    toggleComplete: function() {
      const user = firebase.auth().currentUser;

      if (!user) {
        return;
      }
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("todos")
        .doc(this.todoId)
        .update({
          isComplete: !this.isComplete
        });
    }
  }
};
</script>
