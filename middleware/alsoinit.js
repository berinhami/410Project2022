export default async function init({store}){
    await store.dispatch("accounts/getAccount");
   // console.log("loaded!")
}