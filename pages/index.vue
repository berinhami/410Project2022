<template>
    <div style="font-family: 'Nunito', sans-serif">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6">
                <v-card elevation="5" class="mt-16">
                    <v-card-title justify="center" class="justify-center">
                        <h1>Welcome to Sudoku!</h1>
                    </v-card-title>
                    <v-card-text justify="center">
                        <v-btn class="mt-5" width="100%" color="#F4BC3B" @click.native="$router.push('/login')">Login</v-btn>
                        
                        <v-btn class="mt-5" width="100%" color="#F4BC3B" @click.native="$router.push('/signup')">Create an Account</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
      
    </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      loginForm: {
          username: '',
          password: ''
      }
    }
  },
  middleware:[
    "auth"
  ],
  computed: {
    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>