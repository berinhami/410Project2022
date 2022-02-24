# Semester Project Proposal

For my semeter project, I will build an aplication where a user can create an account, log on, play a sudoku game, and have their progress saved when they log out. Each game will be auto-generated with a relation to a level of difficulty. The puzzle will also be able to be reset if the user desires, and each completed puzzel will grant points to the user. When the user reaches a certain amout of points they will increase in level. 

# DDD
## Events
- start puzzle
- delete puzzle
- number added by user
- number deleted by user
- number modified by user
- user logged in 
- user logged out
- user account created
- user account deleted
- puzzle completed
- puzzle reset
- level updated
- points added
- puzzle created
- puzzle deleted
- puzzle modified
- puzzle submitted 

## Commands
- createPuzzle
- deletePuzzle
- modifyPuzzle
- checkPuzzle
- addUsersNumber
- deleteUsersNumber
- modifyUsersNumber
- logInUser
- LogOutUser
- createUser
- deleteUser
- pointsAdded
- levelIncreased

## Entities
#### Account
- userID
- name
- password
- sessionInfo
- level
- obtainedPoints

#### Puzzle
- puzzleId
- puzzleDifficulty
- originalNumbers
- completed
- userEnteredNumbers

## Value Object

# Rest Design
## Endpoints
--- 
| Description | URL Fragment | HTTP Method | Path Parameter | Representations |
| --- | --- | --- | --- | ---|
| Create Account | /accounts | POST | Create Account
| Delete Account | /accounts/{userid} | DELETE | userid
| Get Account | /accounts/{userid} | GET | userid
| Log In | /accounts/{userid}/login | PUT | userid | Account Login
| Log Out | /accouts/{userid}/logout | PUT | userid
| Create Puzzle | /puzzles | POST | puzzleid | Create Puzzle
| Delete Puzzle | /puzzles/{puzzleid} | DELETE | puzzleid
| Get Puzzle| /puzzles/{puzzleid} | GET | puzzleid | Get Puzzle
| Edit Number | /puzzles/{puzzleid}/cells/{cellid} | PUT | cellid | Set Number
| Get Number | /puzzles/{puzzleid}/cells/{cellid} | GET | Get Number

## Representations
### Create Account
{

    "username": "bingbong"
    "first name": "bing"
    "last name": "bong"
    "password": "goodPassword"

}

### Get Account
{

    "userid": 1
}

### Account Login
{
    
    "password": "goodPassword"

}

### Create Puzzle
{

    "puzzleDifficulty": "easy"
    "originalNumbers":
}

#### Get Puzzle
{

    "puzzleid": 1
}

#### Set Number
{

    "puzzleid": 1
    "cellid": 1
    "userEnteredNumbers": 4
}

#### Get Number
{

    "puzzleid": 1
    "cellid": 1
}

