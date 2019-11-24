<template>
  <div style="width: 40%" class="mx-auto">
    <auth-form @submit="signin" :loading="loading">ログイン</auth-form>
    <div v-if="error" color="red">ユーザー名かパスワードが間違っています</div>
  </div>
</template>

<script>
import AuthForm from "@/components/Auth/authForm.vue";
import firebase from "@/firebase";

export default {
  name: "Register",
  data: function() {
    return {
      error: false,
      loading: false
    };
  },
  components: {
    AuthForm
  },
  methods: {
    signin: function(email, password) {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.$router.push("/todo");
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>
