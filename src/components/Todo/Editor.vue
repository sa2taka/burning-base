<template>
  <div>
    <v-text-field
      v-model="text"
      label="Todo"
      placeholder="Press Ctrl+Enter to Add a Todo"
      required
      @keyup.ctrl.enter="submit"
    ></v-text-field>

    <v-btn
      :disabled="text.length <= 0"
      color="success"
      class="mr-4"
      @click="submit"
      >Todo追加</v-btn
    >
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "TodoEditor",
  data: function() {
    return {
      text: ""
    };
  },
  methods: {
    submit: function() {
      const currentUser = firebase.auth().currentUser;

      // currentUserがこの時点でnullではないが一応
      if (!currentUser) {
        return;
      }
      const text = this.text;
      this.text = "";

      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .collection("todos")
        .add({
          text: text,
          completed: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
  }
};
</script>
