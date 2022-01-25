import Wallet from "./Wallet"
import {useState} from 'react'

// Possibly add handleadbills function. will do a post fetch 
function WalletPage({currentUser}){

  const [makeWallet, setMakeWallet] = useState(false)
  const [newWallet, setNewWallet] = useState({
    walletName: '',
    walletAmount: 0,
  })

  const showWalletForm = () => setMakeWallet(!makeWallet)
  const handleNewWallet = (e) =>   setNewWallet({ ...newWallet, [e.target.name]: e.target.value });

  const createWallet = (e, info) => {
    e.preventDefault()

    const {walletName, walletAmount} = info
    fetch(`/wallets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: walletName,
        amount: walletAmount,
        user_id: currentUser.id
      })
    })
    .then(resp => resp.json()).then(() => window.location.reload())
  }


  return (
    <div>
        <div className="new-wallet-div">
          <button className="new-wallet-btn btn-hover" onClick={() => showWalletForm()}>New Wallet</button>
          {makeWallet &&
          <form className="new-wallet-form" onSubmit={(e) => createWallet(e, newWallet)}>
            <label>Bill:</label>
            <br />
            <input
              type="text"
              name="walletName"
              placeholder="Wallet name"
              className="input-field"
              value={newWallet.name}
              onChange={(e) => handleNewWallet(e)}
            ></input>
            <br />
            <label>Funds:</label>
            <br />
            <input
              type="number"
              name="walletAmount"
              placeholder="Cost"
              className="input-field"
              value={newWallet.amount}
              onChange={(e) => handleNewWallet(e)}
            ></input>
            <button type="submit" className="btn btn-hover">
                Create Wallet
              </button>
          </form>
          }
        </div>
        <div className='wallet-container'>
          {currentUser && 
            currentUser.wallets.map(wallet => <Wallet currentUser={currentUser} currentWallet={wallet} makeWallet={makeWallet}/>)
          }
        </div>
     
    </div>
  )
}

export default WalletPage