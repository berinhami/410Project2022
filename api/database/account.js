const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, username, firstname, lastname, password) {
    const userid = uuid()
    const salt = await bcrypt.genSalt(10)
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (userid, username, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        values: [
            userid,
            username,
            firstname,
            lastname,
            await bcrypt.hash(password, salt)	
        ]
    })
    return rowCount > 0 ? userid : undefined
}

exports.getAccount = async function (client, userid) {
    const { rows } = await client.query({
        name: 'get-account-by-id',
        text: 'SELECT * FROM accounts WHERE userid=$1',
        values: [userid]
    })
    return rows[0]
}

exports.getAccountByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-account-by-username',
        text: 'SELECT * FROM accounts WHERE username=$1',
        values: [username]
    })
    return rows[0]
}

exports.updateAccount = async function (client, userid, data) {
    // create dynamic query based on inputs
    const { username, firstname, lastname, password } = data
    const values = []
    const sets = []

    if (username !== undefined) {
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (firstname !== undefined) {
        values.push(firstname)
        sets.push('firstname=$' + values.length)
    } 

    if (lastname !== undefined) {
        values.push(lastname)
        sets.push('lastname=$' + values.length)
    }

    if (password !== undefined) {
        const salt = await bcrypt.genSalt(10)
        let pasHash = await bcrypt.hash(password, salt)
        values.push(pasHash)
        sets.push('password=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccount(client, userid)

    values.push(userid)
    const { rows } = client.query({
        name: 'update-account',
        text: 'UPDATE accounts SET ' + sets.join(', ') + ' WHERE userid=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows
}

exports.deleteAccount = async function (client, userid) {
    const { rowCount } = client.query({
        name: 'delete-account',
        text: 'DELETE FROM accounts WHERE userid=$1',
        values: [userid]
    })
    return rowCount > 0
}

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}