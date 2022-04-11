export const state = () => {
    return {
        user: getUserFromCookie()
    }
}

// export const getters = {
//     sudokuPuzzles (state){
//         return state.sudokuPuzzles.filter(sudoku.done)
//     }
// }
// export const getters = {
//     isAuthenticated (state) {
//         return state.user !== null
//     }
// }

export const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setAccount(state, account){
        debugger
        state.account = account
    }
}

export const actions = {

    async createAccount({ commit }, {username, firstname, lastname, password }){
        try{
            const res = await this.$axios.post('/api/accounts', {
                username,
                firstname,
                lastname,
                password
            })
            return 'created'

        } catch (e){
            const status = e.response.status
            if (status === 409){
                return 'conflict'
            }else{
                return 'failed'
            }
        }
    },

    async login ({ commit, state }, { username, password }) {
      //  console.log('this is working')
        const res = await this.$axios.put('/api/authentication/login', {
            username,
            password
        })
        if (res.status === 200) {
            commit('setUser', getUserFromCookie())
        }
        // const re = await this.$axios.get('/api/accounts')
        // debugger
        //     if (re.status === 200) {
        //         commit('setAccount', re.data)
        //     }
    },

    async logout ({ commit }) {
        const res = await this.$axios.put('/api/authentication/logout')
        if (res.status === 200) {
            commit('setUser', null)
        }
    },

    async updateAccount({commit}, {username, firstname, lastname, password}){
        let ogUser = getUserFromCookie()
        ogUser = ogUser.substring(1, (ogUser.length - 1))
        debugger
        try{
            const res = await this.$axios.patch(`/api/accounts/${ogUser}`, {
                username,
                firstname,
                lastname,
                password
            })
            if(res.status === 200){
                commit('setUser', res.username)
            }

        } catch (e){
            const status = e.response.status
            if (status === 409){
                return 'conflict'
            }else{
                return 'failed'
            }
        }
    },

    async getAccount({ commit, state}){
        debugger
        console.log('getting account')
        try{
            const res = await this.$axios.get('/api/accounts')
            if (res.status === 200) {
                commit('setAccount', res.data)
            }
        }
        catch(e){
            const status = e.response.status
            if (status === 409){
                return 'conflict'
            }else{
                return 'failed'
            }
        }
    }
}

// Check if the user cookie is set and if so get the cookie value.
// This cookie is set in addition to the session cookie when the user
// authenticated, but this cookie is made accessible to the browser's
// JavaScript.
function getUserFromCookie () {
    const re = new RegExp("user=([^;]+)") 
    const value = re.exec(document.cookie)
    return value != null ? unescape(value[1]) : null
}