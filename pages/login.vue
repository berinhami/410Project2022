<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="8" color="#1B191B">
                    <v-card-title justify="center">
                        <h1>Login</h1>
                    </v-card-title>
                    <v-card-text justify="center">
                        <v-text-field v-model="loginForm.username" lable="username" required />
                        <v-text-field v-model="loginForm.password" type="password" lable="password" required />
                        <v-btn @click="login()">Login</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      loginForm: {
          username: '',
          password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('accounts/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
      .then(() => {
          this.$router.push('/home')
      })
      .catch(() => {
          console.error("Login Failed")
      })
    },
    logout () {
      this.$store.dispatch('accounts/logout')
    }
  },
  computed: {
    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>