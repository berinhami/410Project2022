const puzzles = require('../database/puzzle')

module.exports = function (pool) {
    return {
        async createPuzzle (req, res) {
            const { puzzleDifficulty, originalNumbers} = req.enforcer.body
			const userid = await puzzles.createPuzzle(pool, puzzleDifficulty, originalNumbers)
			if (puzzleId) {
				res.set('location', '/api/puzzles/' + puzzleId)
					.enforcer
					.status(201)
					.send()
			} else {
				res.enforcer.status(409).send()
			}
        },

        async getPuzzle (req, res) {

        },
        
        async updatePuzzle (req, res) {

        },
        
        async deletePuzzle (req, res) {

        },

        async getNumber (req, res) {

        }
    }
}