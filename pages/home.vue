<template>
    <div style="font-family: 'Questrial', sans-serif">
      <br />
      <br />
      <div>  
        <v-row v-if="puzzle.length <= 0" justify="center" align="center"> 
          <v-col md="8">
            <v-card color="#121212" elevation="0">
              <div style="text-align: center">
              <h1 style="font-size:40px">Let's Play Sudoku! </h1>
              </div>
              <p class="ms-3 mt-5" style="font-size:20px">Here are the rules:</p>
              <p class="ms-3" style="font-size:20px">1. Each row in a grid must contain a number 1-9, each row must not have any repeat numbers</p>
              <p class="ms-3" style="font-size:20px">2. Each column in a grid must contain a number 1-9, each column must not have any repeat numbers</p>
              <p class="ms-3" style="font-size:20px">3. Each box in a grid must contain a number 1-9, each box must not have any repeat numbers</p>
              <div style="text-align: center">
                <v-btn class="mt-3" color="#F4BC3B" width="55%" @click="createPuzzle()"
                    >Click Me to Start Playing!</v-btn
                >
              </div>
            </v-card>
          </v-col>
          
        </v-row> 
        <v-row v-if="puzzle.length > 0">
          <v-col cols="12" sm="8" md="5">
            <v-card class="mt-5" elevation="0" color="#121212">
              <v-card-title class="justify-center">
                <!-- <h1>App in progress..</h1>
                <br>
                <br>

                <v-btn class="mt-5 ms-5" color="#F4BC3B" width="100%" @click="createPuzzle()"
                  >Create Puzzle</v-btn
                >
                <v-btn class="mt-5 ms-5" color="#F4BC3B" width="100%" @click="getPuzzle()"
                  >Resume Puzzle</v-btn
                > -->
                <v-btn class="mt-5 ms-5" color="#F4BC3B" width="100%" @click="deletePuzzle(); createPuzzle()"
                  >Submit Puzzle</v-btn
                >
                <v-btn class="mt-5 ms-5" color="#F4BC3B" width="100%" @click="deletePuzzle()"
                  >Delete Puzzle</v-btn
                >
                
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="mt-n7 mr-15" align="right">
            <v-card
            v-if="puzzle.length > 0"
            class="d-flex pa-1 flex-wrap"
            outlined
            tile
            width="513"
            height="512"
            color="#363636"
          >
            <v-card 
                v-for="cell in puzzle"
                :key="cell.index"
                :class="( (cell.index % 9 === 2 && 'mr-1') || (cell.index % 9 === 5 && 'mr-1') || ((cell.index >= 18 && cell.index < 27) && 'mb-1') || ((cell.index >= 48 && cell.index < 54) && 'mb-1'))"
                class="pa-5"
                outlined
                tile
                style="text-align: center"
                width="55"
                height="55"
                
              >
                <!-- output the value or an input box need to call a function which returns orig nums -->
                <v-text-field v-if="cell.iswritable"
                  class="mt-n1"
                  dense
                  @input="updateCell(cell, $event)"
                ></v-text-field>
              
                
                <div class="mt-n1" v-else>
                  <span >
                    {{cell.original}}
                  </span>
                </div>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
</template>

<script>

export default {
  name: "HomePage",
  data() {
    return {
      text: "",
      myNumber: 0,
    };
  },
  middleware:[
    "init"
  ],
  methods: {
    logout() {
      this.$store
        .dispatch("accounts/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          console.error("Logout Failed");
        });
    },
    createPuzzle() {

      //delete any existing puzzles
    
      // this.$store.dispatch("sudoku/deletePuzzle")
      // .then(() => {
      //     console.error("Puzzle Deletion Sent");
      //   })
      //   .catch(() => {
      //     console.error("Puzzle Deletion Failed");
      //   });

      //start building new puzzle
      const puzzleDiff = 30;
      const amtOfCells = 81;
      let anotherOne = 0;
      let skipMe = 82
      let origNums = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
      ];
      let userNums = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
      ];
     
      for (let i = 0; i < amtOfCells; i++) {
        if(skipMe != i){
        let possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let theCell = i

        //check numbers in the same row
        let checkLow = 0;
        let checkHigh = 9;
        let startingCell = theCell % 9

        if (theCell >= 9 && theCell < 18) {
          checkLow = 9;
          checkHigh = 18;
        } else if (theCell >= 18 && theCell < 27) {
          checkLow = 18;
          checkHigh = 27;
        } else if (theCell >= 27 && theCell < 36) {
          checkLow = 27;
          checkHigh = 36;
        } else if (theCell >= 36 && theCell < 45) {
          checkLow = 36;
          checkHigh = 45;
        } else if (theCell >= 45 && theCell < 54) {
          checkLow = 45;
          checkHigh = 54;
        } else if (theCell >= 54 && theCell < 63) {
          checkLow = 54;
          checkHigh = 63;
        } else if (theCell >= 63 && theCell < 72) {
          checkLow = 63;
          checkHigh = 72;
        } else if (theCell >= 72 && theCell < 81) {
          checkLow = 72;
          checkHigh = 81;
        }

        for (let j = checkLow; j < checkHigh; j++) {
          let checkThis = origNums[j];
          if(possibleNums.includes(checkThis)){
            possibleNums = possibleNums.filter((n) => {
                return n !== checkThis;
              });
          }
        }

        //check if number is in the same column
        for (let j = startingCell; j < 81; j = j + 9) {
          let checkThis = origNums[j];
          if(possibleNums.includes(checkThis)){
            possibleNums = possibleNums.filter((n) => {
                return n !== checkThis;
              });
          }
        }

        //check to see if number is in the same box
        
        let b1 = 0
        let b2 = 9
        let b3 = 18

        let p1 = 3
        let p2 = 12
        let p3 = 21

        if(startingCell === 0 || startingCell === 1 || startingCell === 2){
          if(theCell < 22){
            b1 = 0
            b2 = 9
            b3 = 18

            p1 = 3
            p2 = 12
            p3 = 21
          }
          else if(theCell < 48){
            b1 = 27
            b2 = 36
            b3 = 45

            p1 = 30
            p2 = 39
            p3 = 48
          }
          else if(theCell < 75){
            b1 = 54
            b2 = 63
            b3 = 72 

            p1 = 57
            p2 = 66
            p3 = 75
          }
        }
        else if(startingCell === 3 || startingCell === 4 || startingCell === 5){
          if(theCell < 25){
            b1 = 3
            b2 = 12
            b3 = 21

            p1 = 6
            p2 = 15
            p3 = 24
          }
          else if(theCell < 52){
            b1 = 30
            b2 = 39
            b3 = 48

            p1 = 33
            p2 = 42
            p3 = 51
          }
          else if(theCell < 79){
            b1 = 57
            b2 = 66
            b3 = 75

            p1 = 60
            p2 = 69
            p3 = 78
          }
        }
        else if(startingCell === 6 || startingCell === 7 || startingCell === 8){
          if(theCell < 27){
            b1 = 6
            b2 = 15
            b3 = 24

            p1 = 9
            p2 = 18
            p3 = 27
          }
          else if(theCell < 54){
            b1 = 33
            b2 = 42
            b3 = 51

            p1 = 36
            p2 = 45
            p3 = 53
          }
          else{
            b1 = 60
            b2 = 69
            b3 = 78

            p1 = 63
            p2 = 72
            p3 = 81
          }
        }

        for (let j = b1; j < p1; j++) {
          let checkThis = origNums[j];
          if(possibleNums.includes(checkThis)){
            possibleNums = possibleNums.filter((n) => {
                return n !== checkThis;
              });
          }
        }
        for (let j = b2; j < p2; j++) {
          let checkThis = origNums[j];
          if(possibleNums.includes(checkThis)){
            possibleNums = possibleNums.filter((n) => {
                return n !== checkThis;
              });
          }
        }
        for (let j = b3; j < p3; j++) {
          let checkThis = origNums[j];
          if(possibleNums.includes(checkThis)){
            possibleNums = possibleNums.filter((n) => {
                return n !== checkThis;
              });
          }
        }

        //check for conflicts

        //maybe reset to the start of the row
        let checkMePlease = possibleNums.length 
        anotherOne = anotherOne + 1
        //and if cell is not the one that was stored earlier???
        if(checkMePlease === 0 ){
          for(let m = checkLow; m < checkHigh; m++){
            origNums[m] = 0
          }
          possibleNums=[1,2,3,4,5,6,7,8,9]

          //filter the new numbers for the ones already in the box
          for (let j = b1; j < p1; j++) {
            let checkThis = origNums[j];
            if(possibleNums.includes(checkThis)){
              possibleNums = possibleNums.filter((n) => {
                  return n !== checkThis;
                });
            }
          }
          for (let j = b2; j < p2; j++) {
            let checkThis = origNums[j];
            if(possibleNums.includes(checkThis)){
              possibleNums = possibleNums.filter((n) => {
                  return n !== checkThis;
                });
            }
          }
          for (let j = b3; j < p3; j++) {
            let checkThis = origNums[j];
            if(possibleNums.includes(checkThis)){
              possibleNums = possibleNums.filter((n) => {
                  return n !== checkThis;
              });
            }
          }
          console.log(possibleNums)

          //check for colomn again
          for (let j = startingCell; j < 81; j = j + 9) {
            let checkThis = origNums[j];
            if(possibleNums.includes(checkThis)){
              possibleNums = possibleNums.filter((n) => {
                  return n !== checkThis;
                });
            }
          }

          let startHere = checkLow - 1

          let checkMeAgain = possibleNums.length 
          if(checkMeAgain === 0){
            for(let m = b1; m < p3; m++){
              origNums[m] = 0
            }
            possibleNums=[1,2,3,4,5,6,7,8,9]
            startHere = b1 - 1
          }
  
          //refill the row
          
          i = startHere
          skipMe = theCell
          //save the cell of the number that is going to be stored(backto line 310)
        }

        //start putting a number in the cell
        let sizeOfArray = possibleNums.length
        
        let numberToBe = Math.floor(Math.random() * sizeOfArray);
        let setToMe = possibleNums[numberToBe];

        // if(sizeOfArray === 0){
        //   setToMe = 0
        // }
        origNums[theCell] = setToMe; 
        userNums[theCell] = setToMe;
        
       // console.log(origNums)
        

        //check for the colomn again
        
        // if(anotherOne >= 20 ){
        //   for(let m = b1; m < b3; m++){
        //     origNums[m] = 0
        //   }
        //   possibleNums=[1,2,3,4,5,6,7,8,9]
        //   i = b1
        //  anotherOne = 0
        // }
        }
      }
      console.log(origNums)

      //delete some numbers and save to userentered numbers
      let removeMe = Math.floor(Math.random() * 80);
      let RM = removeMe
      for(let d = 0; d < puzzleDiff; d++){
     
        removeMe = Math.floor(Math.random() * 80);
        while(removeMe === RM){
          removeMe = Math.floor(Math.random() * 80);
        }

        origNums[removeMe] = 0
        RM = removeMe
      
         
      }
      let comp = false 

      //Done creating puzzle, send it to the database
     
      this.$store.dispatch("sudoku/createPuzzle", {
          puzzledifficulty: puzzleDiff,
          originalnumbers: origNums,
          userenterednumbers: userNums,
          completed: comp,
        })
        .then(() => {
          this.$store.dispatch("sudoku/getPuzzle"); 
          console.error("Puzzle Creation Sent");
        })
        .catch(() => {
          console.error("Puzzle Creation Failed");
        });
      
    },

    getPuzzle() {
      this.$store.dispatch("sudoku/getPuzzle"); 
    },

    deletePuzzle() {
      this.$store.dispatch("sudoku/deletePuzzle")
      .then(() => {
 
          console.error("Puzzle Deletion Sent");
        })
        .catch(() => {
          console.error("Puzzle Deletion Failed");
        });
     // window.location.reload();
    },

    updateCell(cell, value) {

      console.log(cell.index, value)
      
      let numericalValue = parseInt(value)
      console.log(numericalValue)
      let backup = 0

      if(numericalValue === cell.answer){
        this.$store.dispatch("sudoku/updateIt", {
          cell: cell.index,
          value: value,   
        }) 
        .then(() => {
          this.$store.dispatch("sudoku/getPuzzle"); 
          console.log(cell.isDone)
        })
        .catch(() => {
          console.error("Puzzle Creation Failed");
        });
      }
      else{
        this.$store.dispatch("sudoku/updateIt", {

          cell: cell.index,
          value: backup,
  
        })
      }
      
    },

    updateAccount({params, store}){
      this.$store.dispatch('sudoku/updateAccount', params.index)
    }
  },
  computed: {
    user() {
      return this.$store.state.accounts.user;
    },
    puzzle() {
      return this.$store.state.sudoku.puzzle;
    },
   
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
</style>