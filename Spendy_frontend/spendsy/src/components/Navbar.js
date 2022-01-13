import {useState} from 'react'
import {Link} from 'react-router-dom'

function NavBar({handleLogin}) {

  const [loggedIn, setLoggedIn] = useState(false)

  return(
    <>
      <nav className="navbar">

      <span>Spendsy <i class="fas fa-coins"></i></span>

      <div className="navlink-buttons"> 
            <Link to= "/signIn"><button className="navlink"onClick={() => setLoggedIn(!loggedIn)}>Login</button></Link>
        <Link to='/'>
          <button className="navlink">Home</button>
        </Link>
        </div>
      </nav>
    </>
  )
}
export default NavBar