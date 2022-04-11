export default async function init({store}){
    await store.dispatch("sudoku/getPuzzle");
   // console.log("loaded!")

}