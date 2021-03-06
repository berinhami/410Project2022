const accounts = require('../database/account')

module.exports = function (pool) {
	return {
		async createAccount (req, res) {
			const { username, firstname, lastname, password } = req.enforcer.body
			const userid = await accounts.createAccount(pool, username, firstname, lastname, password)
			if (userid) {
				res.set('location', '/api/accounts/' + userid)
					.enforcer
					.status(201)
					.send()
			} else {
				res.enforcer.status(409).send()
			}
		},

		async updateAccount (req, res) {
			// const data = req.enforcer.body
			// const username = data.username
			const data = req.enforcer.body
			const { username } = req.enforcer.params

			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				if (account === undefined) {
					res.enforcer.status(404).send()
				} else if (account.userid !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await accounts.updateAccount(client, req.user.id, data)
					res.enforcer.status(200).send({
						username: data.username,
						firstname: data.firstname,
						lastname: data.lastname
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

		async deleteAccount (req, res) {
			const { username } = req.enforcer.params
			const client = await pool.connect()
		
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				//let account = await accounts.getAccount(client, userid)
				if (account === undefined) {
					res.enforcer.status(404).send()
				} else if (account.userid !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await accounts.deleteAccount(pool, account.userid)
					res.enforcer.status(204).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async login (req, res) {
			
		},

		async logout (req, res) {

		},

		async getAccount (req,res){
			const userid = req.user.id
            const client = await pool.connect()
            let account = await accounts.getAccount(client, userid)
            if (account === undefined) {
                res.enforcer.status(404).send()
            } else {
                res.enforcer.status(200).send({
                    username: account.username,
					firstname: account.firstname,
					lastname: account.lastname
                })
            }
		}
	}
}