exports.createPuzzle = async function (client, puzzleDifficulty, originalNumbers) {
    const { rowCount } = await client.query({
        name: 'create-puzzle',
        text: 'INSERT INTO puzzles (puzzleId, puzzleDifficulty, originalNumbers) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            puzzleId,
            puzzleDifficulty,
            originalNumbers	
        ]
    })
    return rowCount > 0 ? puzzleId : undefined
}