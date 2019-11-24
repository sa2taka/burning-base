<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2 class="d-flex align-center">TODOING</h2>

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/register')" text v-if="!isSignin">
        <span class="mr-2">登録</span>
      </v-btn>

      <v-btn @click="$router.push('/signin')" text v-if="!isSignin">
        <span class="mr-2">ログイン</span>
      </v-btn>

      <v-btn @click="$router.push('/todo')" text v-if="isSignin">
        <span class="mr-2">Todo</span>
      </v-btn>

      <v-btn @click="signOut" text v-if="isSignin">
        <span class="mr-2">ログアウト</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "App",

  data: () => ({
    isSignin: false
  }),

  created: function() {
    if (firebase.auth().currentUser) {
      this.isSignin = true;
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isSignin = true;
      } else {
        this.isSignin = false;
      }
    });
  },

  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
