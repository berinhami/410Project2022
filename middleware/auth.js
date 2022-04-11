export default function auth({ redirect, store }) {
    if (store.state.accounts.user === null) {
      return redirect('/login')
    }
    else{
      return redirect('/home')
    }
    
  }

  //get accoutnt
  //update account
  //load methods on page load
  //check puzzle if correct