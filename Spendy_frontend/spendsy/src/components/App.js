// Imports
import Landing from "./Landing";
import Wallet from "./Wallet";
import WalletPage from "./WalletPage";
import Home from "./Home";
import CreateWallet from "./CreateWallet";
import SignIn from "./SignIn";
import BillForm from './BillForm'
// Hooks
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  //State Variables
  const [currentUser, setCurrentUser] = useState({})


  useEffect(()=> {
    fetch("/me")
    .then((r) => r.json())
        .then((user) => {
          setCurrentUser(user)       
          console.log(user)
        })
  }, [])

  
  
 

  return (
    <BrowserRouter>

    
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path='/signIn' element={<SignIn setCurrentUser={setCurrentUser}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/page" element={<WalletPage />} />
          <Route path="/wallet/new" element={<CreateWallet />} />
          <Route path="/form" element={<BillForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// new router syntax <Route path='/welcome' element={<Home/>} />
