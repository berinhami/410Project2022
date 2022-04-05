<template>
    <div style="font-family: 'Questrial', sans-serif">
      <br>
      <br>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="8" style="font-family: 'Questrial', sans-serif">
                    <v-card-title justify="center">
                        <h1>Sign Up.</h1>
                    </v-card-title>
                    <v-card-text justify="center">
                        <v-text-field v-model="signupForm.firstname" label="First Name" required />
                        <v-text-field v-model="signupForm.lastname" label="Last Name" required />
                        <v-text-field v-model="signupForm.username" label="Username" required />
                        <v-text-field v-model="signupForm.password" type="Password" label="password" required />
  
                        <v-btn width="100%" color="#F4BC3B" @click="createAccount()">Create My Account</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'Create Account Page',
  data () {
    return {
      signupForm: {
          username: '',
          firstname: '',
          lastname: '',
          password: ''
      }
    }
  },
  methods: {
    createAccount () {
      this.$store.dispatch('accounts/createAccount', {
        username: this.signupForm.username,
        firstname: this.signupForm.firstname,
        lastname: this.signupForm.lastname,
        password: this.signupForm.password
      })
      .then(() => {
          this.$router.push('/login')
      })
      .catch(() => {
          console.error("Sign Up Failed")
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
</style>