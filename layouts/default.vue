<template>
  <v-app>
    
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      style="font-family: 'Questrial', sans-serif"
    >
      <!-- <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
      <div  class="ms-1 mt-4" v-if="user !== null">
        <v-list-item>
          <v-list-item-content>
            Account for {{user}}
            <v-spacer />
            <form @submit.prevent="updateAccount()">
              <v-text-field v-model="updateForm.firstname" label="First Name" required />
              <v-text-field v-model="updateForm.lastname" label="Last Name" required />
              <v-text-field v-model="updateForm.username" label="username" required />
              <v-text-field v-model="updateForm.password" type="Password" label="Password" required />
              <v-btn color="#F4BC3B"  type="submit">Update Account</v-btn>
              <v-btn color="#F4BC3B"  @click="getAccount()">Get Account Info</v-btn>
            </form>
          </v-list-item-content>
        </v-list-item>

      </div>
      <div class="ms-1 mt-4" v-if="user === null">
        <v-list-item>
          <v-list-item-content>
            <v-btn color="#363636" elevation="0" width="100%" @click.native="$router.push('/login')"> Back to Log In</v-btn>
          </v-list-item-content>
        </v-list-item>

      </div>

    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="black"
      style="font-family: 'Questrial', sans-serif"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
     
      <!-- <v-btn class="mx-2 ma-2" color="#F9FDF8" @click.native="$router.push('/account')">Account</v-btn> -->
      <v-spacer />

      <v-btn color="#F4BC3B" v-if="user !== null"  @click.native="logout()">Logout</v-btn>
      
    </v-app-bar>
    
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <!-- <v-btn v-if="users !== null"  @click.native="logout()"> -->
        <!-- <v-list-item v-if="users === null" @click.native="$router.push('/login')">Login</v-list-item> -->
        <!-- <v-list-item @click.native="right = !right"> -->
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <!-- <v-list-item-title>Switch drawer (click me)</v-list-item-title> -->
        <!-- </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      color="#000000"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    const user = this.$store.state.accounts.user
    return {
      updateForm: {
          username: '',
          firstname: '',
          lastname: '',
          password: ''
      },
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Sudoku'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('accounts/logout')
      this.$router.push('/login')
    },
    updateAccount() {
      this.$store.dispatch('accounts/updateAccount', {
        username: this.updateForm.username,
        firstname: this.updateForm.firstname,
        lastname: this.updateForm.lastname,
        password: this.updateForm.password
      })
    },
    getAccount(){
      this.$store.dispatch('accounts/getAccount')
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

<style scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>
