<template>
    <div>
      <v-card-text justify="center">
          <v-btn @click="logout()">LogOut</v-btn>
      </v-card-text>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
        text: ''
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('accounts/logout')
      .then(() => {
          this.$router.push('/login')
      })
      .catch(() => {
          console.error("Logout Failed")
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