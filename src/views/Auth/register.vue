<template>
  <div style="width: 40%" class="mx-auto">
    <auth-form @submit="register" :loading="loading">登録</auth-form>
    <div v-if="error">すでに登録されているメールアドレスです</div>
  </div>
</template>

<script>
import AuthForm from "@/components/Auth/authForm.vue";
import firebase from "@/firebase";

export default {
  name: "Register",
  components: {
    AuthForm
  },
  data: function() {
    return {
      error: false,
      loading: false
    };
  },
  methods: {
    register: function(email, password) {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({
              displayName: email.split("@")[0],
              email: email,
              isPublic: false
            })
            .then(() => {
              this.$router.push("/todo");
            });
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    }
  }
};
</script>
