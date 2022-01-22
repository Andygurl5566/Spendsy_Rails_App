import NavBar from "./Navbar"
import {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'

function SignIn({setCurrentUser}) {

function navToSignup(){
  navigate("/signup")
}

const [loggingIn, setLoggingIn] = useState(true)
const [showError, setShowError] = useState(false)
const navigate = useNavigate()
const [formData, setFormData] = useState({
  email: "",
  password: ""
})

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const handleSubmit = (e) => {

  e.preventDefault(); 
  fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  .then((res) => {

    console.log(res)
    if (res.ok) {
      res.json()
      .then((user) => {
        setCurrentUser(user) 
        console.log(setCurrentUser)
      }) 
      fetch("/me")
      .then((r) => r.json())
          .then((user) => {
            setCurrentUser(user)       
          })
      
      .then(() => navigate("/home"))
      
    } else {
      res.json().then((errors) => {
        console.error(errors)
        setShowError(true)
      })
    }
  })
}


  return (
    <div>
      <h1 class="login-requirements">{loggingIn ? <> <h3>Log in</h3> <br></br>Enter Username and Password </>: 'Please create a username and password'}</h1>
      <p class="login-requirements" > {showError == false ? "": <h4 className="errorCode">Incorrect Email or Password. Please try Again</h4>} </p>

      <form className="bill-entry login-form" onSubmit={handleSubmit}>
        
      <label>Email: </label>
        <input
          type='text'
          className='input-field'
          name= 'email'
          required='required'
          value={formData.email}
          placeholder='Email'
          onChange={handleChange}></input>
        

        <label>Password: </label>
        <input
          type='password'
          name='password'
          required='required'
          className='input-field'
          value={formData.password}
          placeholder='Password'
          onChange={handleChange}></input>
          <div className="form-btn-container">
          
          {!loggingIn ? <p  className="btn btn-hover" >Log In</p>
           : <p className="btn btn-hover" onClick={navToSignup} >Sign Up</p>}
           <button className="btn btn-hover">Continue</button>
        </div>
      </form>
        
    </div>
  )
}

export default SignIn