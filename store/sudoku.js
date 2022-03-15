export const state = () => ({
    list: []
})

export const mutations = {
    add(state, text) {
        state.list.push({
            text,
            done: false
        })
    },
    remove(state, { sudoku }) {
        state.list.splice(state.list.indexOf(sudoku), 1)
    },
    toggle(state, sudoku) {
        sudoku.done = !sudoku.done
    }
}

export const actions = {
    getPuzzle ({ commit, state }) {
        console.log('Making ajax call')
        const list = [
            { done: false, text: '0, 1, 2, 3...'}
        ]
        list.forEach(item => {
            commit('add', item)
        })

    }
}
//james.speirs@gmail.com