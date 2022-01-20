// Imports
import Landing from "./Landing";
import Wallet from "./Wallet";
import WalletPage from "./WalletPage";
import Home from "./Home";
import CreateWallet from "./CreateWallet";
import SignIn from "./SignIn";
import BillForm from './BillForm'
import SignUp from "./SignUp";
import NavBar from "./Navbar";
// Hooks
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  //State Variables
  const [currentUser, setCurrentUser] = useState(null)


  useEffect(()=> {
    fetch("/me")
    .then((r) => r.json())
        .then((user) => {
          setCurrentUser(user)       
        })
  }, [])

  const logout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => setCurrentUser(null))
  }
  
 

  return (
    <BrowserRouter>

    
      <div className="App">
        <NavBar currentUser={currentUser} logout={logout}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path='/signIn' element={<SignIn setCurrentUser={setCurrentUser}/>} />
          <Route path="/home" element={<Home currentUser={currentUser} />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/page" element={<WalletPage currentUser={currentUser}/>} />
          <Route path="/wallet/new" element={<CreateWallet />} />
          <Route path="/form" element={<BillForm currentUser={currentUser}/>} />
          <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// new router syntax <Route path='/welcome' element={<Home/>} />
