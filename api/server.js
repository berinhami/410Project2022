require('dotenv').config()
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const Accounts = require('./controllers/accounts')
const Puzzles = require('./controllers/puzzles')

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT
})

// test that we can connect to the database
pool.query('SELECT NOW()', (err, res) => {
if (err) {
  console.error(err)
  process.exit(1)
} else {
  console.log('Database connected')
}
})

const app = express()

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcerPromise = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcerPromise)


//body parseers
app.use(express.json())
app.use(express.text())

//cookies and pasport

// app.use((req, res, next) => {
//   console.log(req.method + ' ' + req.path, req.headers, req.body)
//   next()
// })

app.use(enforcerMiddleware.init({ baseUrl: '/api' }))

// Catch errors
enforcerMiddleware.on('error', err => {
  console.error(err)
  process.exit(1)
}) 

//for cookies
// app.use((req, res, next) => {
//   const { opperation } = req.enforcer
//   if (opperation.security !== undefined ){
//     const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
//     if(sessionIsRequired){
//       const cookie = req.cookie.sudokuSessionId
//       if (cookie === undefined || req.user === undefined) {
//         res.sendStatus(401)
//         return
//       } 
//     }
//   }
//   next()
// })

app.use(enforcerMiddleware.route({
	accounts: Accounts(pool),
	puzzles: Puzzles(pool)
}))

//   app.use(enforcerMiddleware.route({
//     // The "users" is mapped to via the "x-controller" value.
//     accounts: {
//       // The "listUsers" is mapped to via the "x-operation" or "operationId" value.
//       async login (req, res) {
//         const { rows } = dbClient.query('SELECT * FROM users')
//         const users = rows.map(row => {
//           return {
//             id: row.id,
//             name: row.name,
//             email: row.email
//           }
//         })
//         res.enforcer.send(users)
//       }
//     }
//   }))

// add fallback mocking middleware here
app.use(enforcerMiddleware.mock())

module.exports = app