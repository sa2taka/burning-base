<template>
  <v-form ref="form" v-model="valid" @keyup.enter="submit">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      @keyup.enter="submit"
      :loading="loading"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
      :loading="loading"
      type="password"
      @keyup.enter="submit"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit"
      :loading="loading"
    >
      <slot></slot>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "AuthForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    submit: function() {
      if (!this.valid) {
        return;
      }
      this.$emit("submit", this.email, this.password);
    }
  }
};
</script>
