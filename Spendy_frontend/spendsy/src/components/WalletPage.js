import Wallet from "./Wallet"


// Possibly add handleadbills function. will do a post fetch 
function WalletPage({currentUser}){
  return (
    <div>
      {currentUser && 
     currentUser.wallets.map(wallet => <Wallet currentUser={currentUser} currentWallet={wallet}/>)
     }
    </div>
  )
}

export default WalletPage