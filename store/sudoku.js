import { getPuzzle } from "~/api/database/puzzle"

export const state = () => {
    return{
        puzzle: []
    } 
}

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
    },
    
    setPuzzle(state, puzzle){
        state.puzzle = puzzle.originalnumbers.map((value, index) => {
            return {
                index,
                original: value,
                value: value ?? puzzle.userenterednumbers[index],
                iswritable: value===0
            }
        })
    },
    setCell(state, data){
        const puzzle = state.puzzle.slice()
        puzzle[data.index].value = parseInt(data.value)
        state.puzzle = puzzle
    }

}

export const actions = {

    async createPuzzle ({ commit }, {puzzledifficulty, originalnumbers, userenterednumbers, completed }) {
       
        try{
            const res = await this.$axios.post('/api/puzzles', {
                puzzledifficulty, 
                originalnumbers, 
                userenterednumbers, 
                completed
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

    async getPuzzle ({ commit, state}) {
        console.log('sudoku get puzzle')
        try{
            const res = await this.$axios.get('/api/puzzles')
            if (res.status === 200) {
                commit('setPuzzle', res.data)
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
    },

    async deletePuzzle({comit, state}) {
        try{
            const res = await this.$axios.delete('/api/puzzles')
            if (res.status === 200) {
                return 'deleted'
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
    },

    async updatePuzzle({commit, state}, {diff, cell, value, completed}){
        debugger
       
        try{
            commit('setCell', cell, value)
            let newPuzzle = state.puzzle
            // const res = await this.$axios.patch('/api/puzzles', {
            //     diff, 
            //     newPuzzle, 
            //     newPuzzle, 
            //     completed
            // })
            if (res.status === 200) {
               return 'updated'
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
//james.speirs@gmail.com