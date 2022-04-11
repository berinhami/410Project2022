<template>
    <div style="font-family: 'Questrial', sans-serif">
      <br>
      <br>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="8" style="font-family: 'Questrial', sans-serif">
                    <v-card-title justify="center" >
                        <h1>Update Account Info.</h1>
                    </v-card-title>
                    <v-card-text justify="center">
                      
                        <v-text-field v-model="updateForm.firstname" :label="account.firstname" required />
                        <v-text-field v-model="updateForm.lastname" :label="account.lastname" required />
                        <v-text-field v-model="updateForm.username" :label="account.username" required />
                        <v-text-field v-model="updateForm.password" type="Password" label="password" required />
  
                        <v-btn width="100%" color="#F4BC3B" @click="updateAccount()">Update Account</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'AccountPage',
  data () {
    return {
      updateForm: {
          username: '',
          firstname: '',
          lastname: '',
          password: ''
      }
    }
  },
  middleware:[
    "alsoinit"
  ],
  methods: {
   updateAccount() {
      //const user = this.$store.state.accounts.user
      this.$store.dispatch('accounts/updateAccount', {
        username: this.updateForm.username,
        firstname: this.updateForm.firstname,
        lastname: this.updateForm.lastname,
        password: this.updateForm.password
      })
      .then(() => {
          this.$store.dispatch('accounts/getAccount'); 
          console.error("Account Update Sent");
          window.location.reload();
        })
        .catch(() => {
          console.error("Account Update Failed");
        });

    },
    getAccount(){
      const user = this.$store.state.accounts.user
      this.$store.dispatch('accounts/getAccount')
      debugger
      console.log(user)
    }
  },
  computed: {
    user(){
      return this.$store.state.accounts.user
    },
    account(){
      return this.$store.state.accounts.account
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
</style>