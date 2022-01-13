import NavBar from "./Navbar"
import WalletForm from "./BillForm"
import {Routes, Route, Link} from 'react-router-dom'
import {useState} from 'react'

function CreateWallet(){

    const [walletName, setWalletName] = useState('')
    const [walletFunds, setWalletFunds] = useState(0)

    function handleWalletName(input) {
      setWalletName(input)
    }
   
    function handleWalletFunds(input) {
      setWalletFunds(input)
    }


  return (
    <>
    <div>
      <NavBar />

      <form class="create-wallet-form">
        <label for="wallet-name">Wallet Name: </label>
        <input 
          type= "text" 
          value={walletName}
          id="wallet-name"
          className="input-field"
          onChange={(e) => handleWalletName(e.target.value)} />
        <label for="wallet-funds">Amount: </label>
        <input 
          type= "number" 
          value={walletFunds}
          id="wallet-funds"
          className="input-field"
          onChange={(e) => handleWalletFunds(e.target.value)} />
          <Link to="/form">
          <button class="btn btn-hover">Create Wallet</button>
          </Link>
      </form>
  
      <Routes>
        <Route path="/form" element={<WalletForm />} />
      </Routes>
    </div>
  </>
    
  )
}

export default CreateWallet;
