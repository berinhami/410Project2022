<template>
  <div>

    <h1>Authentication</h1>
    <v-btn @click="login()">Log In</v-btn>
    <v-btn @click="logout()">Log Out</v-btn>

    <div v-if="user !== null">
      Logged in as {{user}}
    </div>

    <div v-if="user == null">
      Logged out!
    </div>

    <h1>Do Stuff</h1>
    <v-btn @click="getPuzzle()">Load</v-btn>
    <v-btn @click="addPuzzle()">Start Puzzle</v-btn>

    <ul>
      <li v-for="item in list" :key="item.text">
        {{item.text}}
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    addPuzzle () {
      this.$store.commit('sudoku/add', this.text)
      this.text = ''
    },
    getPuzzle () {
      this.$store.dispatch('sudoku/getPuzzle')
    },
    login () {
      this.$store.dispatch('accounts/login', {
        username: 'myUserName',
        password: 'goodPassword'
      })
    },
    logout () {
      this.$store.dispatch('accounts/logout')
    }
  },
  computed: {
    list () {
      return this.$store.state.sudoku.list
    },
    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>
