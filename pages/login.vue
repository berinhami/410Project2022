<template>
    <div style="font-family: 'Questrial', sans-serif">
      <!-- <v-row justify="center" align="center">
            <v-col cols="10" sm="14" md="16">
                <v-card class="logincard">
                    <v-card-title justify="center">
                        <h1>Welcome to Sudoku!</h1>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row> -->
        <br>
        <br>
        <br>
        <v-row >
          <v-col cols="12" sm="10" md="6">
                <v-card class="mt-16 ml-3 pt-7" elevation="0" color="#121212">
                    <v-card-title class="justify-left">
                      <div >
                        <p style="font-size:55px">Welcome to Sudoku <br> <br>Online!</p>
                   
                        <p style="font-size:38px"> <br>Sign in to get started</p>
                      </div>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col cols="12" sm="8" md="6">
                <v-card class="mt-4" elevation="3">
                    <v-card-title justify="center">
                        <h1 style="color:white">Sign In.</h1>
                    </v-card-title>
                    <v-card-text justify="center">
                        <v-text-field class="mt-10" v-model="loginForm.username" label="username" required />
                        <v-text-field class="mt-3" v-model="loginForm.password" type="password" label="password" required />
                        <v-btn class="buttons mt-3" color="#F4BC3B" width="100%" @click="login()">Login</v-btn>
                        <v-btn class="mt-4 mb-2" color="#F4BC3B" width="100%" @click.native="$router.push('/signup')">Create an Account</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
      
      <!-- <div v-if="user == null">
          Logged out!
    </div>
    <div v-if="user !== null">
      Logged in as {{user}}
    </div> -->
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


//update puzzle
//get puzzle showing correctly
//check is puxxle is correct
//get a new puzzle 
//takashi


</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
</style>
