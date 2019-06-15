<template>
  <div class="container">
    <div class="auth-header">
      <div class="auth-header-title">Календарь событий</div>
    </div>
    <div class="auth-icon-wrap">
      <img src="../assets/icons/auth-icon.svg" alt>
    </div>
    <v-form class="auth-form" ref="form" v-model="valid" lazy-validation>
      <v-text-field name="email" label="Email" type="email" :rules="emailRules" v-model="email"></v-text-field>
      <v-text-field
        class="auth-password-field"
        id="password"
        name="password"
        label="Пароль"
        type="password"
        :rules="passwordRules"
        v-model="password"
      ></v-text-field>
      <v-alert
        :value="error"
        type="error"
        style="margin-bottom: 30px;"
      >
        {{error}}
      </v-alert>
      <v-btn color="accent" @click="onSubmit" :disabled="!valid || loading" :loading="loading">Войти</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "Пожалуйста, введите Ваш email",
        v => /.+@.+/.test(v) || "Пожалуйста, введите корректный email"
      ],
      passwordRules: [v => !!v || "Пожалуйста, введите Ваш пароль"]
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
          const user = {
              email: this.email,
              password: this.password
          }
          this.$store.dispatch('signin', user)
      }
      // if (this.$refs.form.validate()) {
      //     const user = {
      //         email: this.email,
      //         password: this.password
      //     }
      //     this.$store.dispatch('signin', user)
      // }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    }
  },
};
</script>
<style>
.auth-header {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 47px;
}

.auth-header-title {
  line-height: 1;
  font-size: 18px;
  font-weight: 700;
}

.auth-icon-wrap {
  text-align: center;
  margin-bottom: 35px;
}

.auth-form {
    text-align: center;
}

.auth-password-field {
  margin-bottom: 40px;
}
</style>

