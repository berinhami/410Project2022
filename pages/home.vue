<template>
    <div style="font-family: 'Questrial', sans-serif">
      <br />
      <br />
      <div>   
        <v-row justify="left" align="left">
          <v-col cols="12" sm="8" md="5">
            <v-card class="mt-5" elevation="0" color="#121212">
              <v-card-title class="justify-center">
                <h1>App in progress..</h1>
                <br>
                <br>
                <v-btn class="ms-5" color="#F4BC3B" @click="createPuzzle()"
                  >Start a Puzzle</v-btn
                >
                <v-btn class="ms-5" color="#F4BC3B" @click="getPuzzle()"
                  >Resume Puzzle</v-btn
                >
                <v-btn class="mt-5 ms-5" color="#F4BC3B" @click="deletePuzzle()"
                  >Delete Puzzle</v-btn
                >
                <v-btn class="mt-5 ms-5" color="#F4BC3B" @click="resetPuzzle()"
                  >Restart Puzzle</v-btn
                >
                <v-btn class="mt-5 ms-5" color="#F4BC3B" @click="checkPuzzle()"
                  >Submit Puzzle</v-btn
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
                :class="(cell.index % 9 === 2 && 'mr-1') || (cell.index % 9 === 5 && 'mr-1') || ((cell.index >= 18 && cell.index < 27) && 'mb-1') || ((cell.index >= 48 && cell.index < 54) && 'mb-1')"
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
      
      const puzzleDiff = 20;
      const amtOfCells = 81;
      const cellsFilled = amtOfCells - puzzleDiff;
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

        let possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //let theCell = Math.floor(Math.random() * 80);
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

        //if a row has an empty spot(possibleNums[]) then restart the whole row
        // let checkMePlease = possibleNums.length 
      
        // if(checkMePlease === 0){
        //   for(let m = checkLow; m < checkHigh; m++){
        //     origNums[m] = 0
        //   }
        //   possibleNums=[1,2,3,4,5,6,7,8,9]
        //   let startHere = checkLow - 1
        //   i = startHere
        // }


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
          else if(theCell < 49){
            b1 = 27
            b2 = 36
            b3 = 45

            p1 = 30
            p2 = 39
            p3 = 48
          }
          else if(theCell < 76){
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

        //for the conflicts
        let checkMePlease = possibleNums.length 
        if(checkMePlease === 0){
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
          //refill the row
          let startHere = checkLow - 1
          i = startHere
        }

        //start putting a number in the cell
        let sizeOfArray = possibleNums.length
        let numberToBe = Math.floor(Math.random() * sizeOfArray);
        let setToMe = possibleNums[numberToBe];
        

        if(sizeOfArray === 0){
          setToMe = 0
        }
        origNums[theCell] = setToMe; 
        userNums[theCell] = setToMe;

       
      }
      console.log(origNums)

      //delete some numbers and save to userentered numbers
      for(let d = 0; d < puzzleDiff; d++){
        let removeMe = Math.floor(Math.random() * 80);
        origNums[removeMe] = 0
        
      }

      //Done creating puzzle, send it to the database
      this.$store.dispatch("sudoku/createPuzzle", {
          puzzledifficulty: puzzleDiff,
          originalnumbers: origNums,
          userenterednumbers: userNums,
          completed: false,
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
      //console.log('get puzzle')
      this.$store.dispatch("sudoku/getPuzzle"); 
    },

    deletePuzzle() {
      this.$store.dispatch("sudoku/deletePuzzle");
      window.location.reload();
    },

    updateCell(cell, value) {
      let diff = 20
      let completed = false
      console.log(cell.index, value)

      this.$store.dispatch("sudoku/updatePuzzle", {
        diff: diff,
        cell: cell.index,
        value: value,
        completed: completed
      })

      // cycle thru puzzle and add values
      // use dispatch to send it to the database
      // send in puzzle difficulty, puzzle, completed
    },

    resetPuzzle(){
      //set puzzle original 
      console.log("reset me")
    },

    checkPuzzle(){
      //see if origNums match usernums
    },

    getAccount(){
      
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