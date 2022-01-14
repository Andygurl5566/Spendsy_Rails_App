import NavBar from "./Navbar"
import LoginPage from "./Home"
import {useState, useEffect} from 'react'
import {Route, useNavigate} from 'react-router-dom'

function SignIn() {

const [loggingIn, setLoggingIn] = useState(true)
const [users, setUsers] = useState([])
const [formData, setFormData] = useState({
  username: '',
  password: ''
})
const navigate = useNavigate()

useEffect( () =>{ 
fetch(`http://localhost:3000/me`)
  .then(resp => resp.json())
  .then(data => setUsers(data))
}, [])

const logIn = (e ,username, password) => {
  e.preventDefault()

 if(users.find(user => user.name === username.trim() && user.password === password.trim())) {
   localStorage.setItem('username', username)
  navigate(`/home`)
 } else {
   alert('Incorrect login information')
 }

  // if(users.find() !== username || formData.username !== password ){
  //   alert('Please try again')
  // } else {

  }
const createWallet= (username, ) => {
  const walletAmount = prompt("What is your monthly income? ")
  fetch(`http://localhost:9292/user/wallets/${localStorage.getItem('username')}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      wallet_name: `${username}'s Wallet`,
      amount: walletAmount
    })
  })
  .then(resp => resp.json())
}

const signUp = (e, username, password) => {
  e.preventDefault()
  localStorage.setItem('username', username)

  fetch(`http://localhost:9292/user/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: username,
      password: password
    })
  })
  .then(resp => resp.json())
  .then(alert('New user created'))

  createWallet(username, password)
  navigate('/home')
}

const handleLoggingIn = () => {
  setLoggingIn(!loggingIn)
}

const handleFormData = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  return (
    <div>
      <NavBar />
      <h1 class="login-requirements">{loggingIn ? 'Enter Username and Password' : 'Please create a username and password'}</h1>

      <form className="bill-entry login-form" onSubmit={loggingIn ? (e) => logIn(e, formData.username, formData.password)
         : (e) => signUp(e, formData.username, formData.password)}>
        <label>Username: </label>
        <input
          type='text'
          className='input-field'
          name= 'username'
          required='required'
          value={formData.username}
          placeholder='Username'
          onChange={(e) => handleFormData(e)}></input>
        <label>Password: </label>
        <input
          type='text'
          name='password'
          required='required'
          className='input-field'
          value={formData.password}
          placeholder='Password'
          onChange={(e) => handleFormData(e)}></input>
          <div className="form-btn-container">
          <button className="btn btn-hover">Continue</button>
          {!loggingIn ? <p  className="btn btn-hover" onClick={handleLoggingIn}>Log In</p>
           : <p className="btn btn-hover" onClick={handleLoggingIn}>Sign Up</p>}
        </div>
      </form>
        
    </div>
  )
}

export default SignIn