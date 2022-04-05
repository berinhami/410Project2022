const uuid = require('uuid').v4

exports.createPuzzle = async function (client, userid, puzzledifficulty, originalnumbers, userenterednumbers, completed) {
    const puzzleid = uuid()
    const { rowCount } = await client.query({
        name: 'create-puzzle',
        text: 'INSERT INTO puzzles (puzzleid, userid, puzzledifficulty, originalnumbers, userenterednumbers, completed) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        values: [
            puzzleid,
            userid,
            puzzledifficulty,
            JSON.stringify(originalnumbers),
            JSON.stringify(userenterednumbers),
            completed
        ]
    })

    return rowCount > 0 ? puzzleid : undefined
}

exports.getPuzzle = async function (client, userid) {
    const { rows } = await client.query({
        name: 'get-puzzle-by-id',
        text: 'SELECT * FROM puzzles WHERE userid=$1',
        values: [userid]
    })
    const myRows = rows[0]
    if (myRows !== undefined){
        myRows.originalnumbers = JSON.parse(myRows.originalnumbers)
        myRows.userenterednumbers = JSON.parse(myRows.userenterednumbers)
    }
    return myRows
}

exports.deletePuzzle = async function (client, userid) {
    const { rowCount } = client.query({
        name: 'delete-puzzle',
        text: 'DELETE FROM puzzles WHERE userid=$1',
        values: [userid]
    })
    return rowCount > 0
}

exports.updatePuzzle = async function (client, userid, data){
    const { puzzledifficulty, originalnumbers, userenterednumbers, completed} = data
    const values = []
    const sets = []

    if (originalnumbers !== undefined) {
        values.push(originalnumbers)
        sets.push('originalnumbers=$' + values.length)
    }

    if (userenterednumbers !== undefined) {
        values.push(userenterednumbers)
        sets.push('userenterednumbers=$' + values.length)
    } 

    if (completed !== undefined) {
        values.push(completed)
        sets.push('completed=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccount(client, userid)

    values.push(userid)
    const { rows } = client.query({
        name: 'update-puzzle',
        text: 'UPDATE puzzles SET ' + sets.join(', ') + ' WHERE userid=$' + (values.length) + ' RETURNING *',
        values: [
            JSON.stringify(originalnumbers),
            JSON.stringify(userenterednumbers),
            completed,
            userid
        ]
    })
    return rows
}