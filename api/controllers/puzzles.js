const puzzles = require('../database/puzzle')
const accounts = require('../database/account')

module.exports = function (pool) {
    return {
        async createPuzzle (req, res) {
            const userid = req.user.id
            const { puzzledifficulty, originalnumbers, userenterednumbers, completed} = req.enforcer.body

			const puzzleid = await puzzles.createPuzzle(pool, userid, puzzledifficulty, originalnumbers, userenterednumbers, completed)
			if (puzzleid) {
				res.set('location', '/api/puzzles/' + puzzleid)
					.enforcer
					.status(201)
					.send()
			} else {
				res.enforcer.status(409).send()
			}
        },

        async getPuzzle (req, res) {
            //const { userid } = req.enforcer.params
            const userid = req.user.id
            const client = await pool.connect()
            let puzzle = await puzzles.getPuzzle(client, userid)
            if (puzzle === undefined) {
                res.enforcer.status(404).send()
            } else {
                res.enforcer.status(200).send({
                    puzzledifficulty: puzzle.puzzledifficulty,
                    originalnumbers: puzzle.originalnumbers,
                    userenterednumbers: puzzle.userenterednumbers,
                    completed: puzzle.completed
                }
                )
            }
        },
        
        async deletePuzzle (req, res) {
           // const { userid } = req.enforcer.params
            const userid = req.user.id
            const client = await pool.connect()
            let puzzle = await puzzles.deletePuzzle(client, userid)
            if (puzzle === undefined) {
                res.enforcer.status(404).send()
            } else {
                res.enforcer.status(204).send()
            }

        },

        async updateIt(req, res){
            const data = req.enforcer.body
          //  const { userid } = req.enforcer.params
            const userid = req.user.id

            const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let puzzle = await puzzles.getPuzzle(client, userid)
				if (puzzle === undefined) {
					res.enforcer.status(404).send()
				} else {
					await puzzles.updatePuzzle(client, userid, data)
					res.enforcer.status(200).send({
                        puzzledifficulty: data.puzzledifficulty,
                        originalnumbers: data.originalnumbers,
                        userenterednumbers: data.userenterednumbers,
                        completed: data.completed
					})
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}

        },

        async getNumber (req, res) {

        }
    }
}