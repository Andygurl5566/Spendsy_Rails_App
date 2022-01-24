import {useState} from 'react'
import {Link} from 'react-router-dom'

function NavBar({currentUser, logout}) {


  return(
    <>
      <nav className="navbar">

      <span>Spendsy <i class="fas fa-coins"></i></span>

      <div className="navlink-buttons"> 
          {currentUser ?
          <>
            <Link to= "/">
              <button className="navlink" onClick={() => logout()}>Logout</button>
            </Link>
            <Link to='/wallet/page'>
              <button className="navlink">Wallets</button>
            </Link>
          </>
          : 
          <>
            <Link to= "/signIn">
              <button className="navlink">Login</button>
            </Link>
            <Link to='/'>
              <button className="navlink">Home</button>
            </Link>
          </>
            }
        </div>
      </nav>
    </>
  )
}
export default NavBar