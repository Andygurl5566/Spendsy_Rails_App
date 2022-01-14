import NavBar from "./Navbar"
import {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'

function SignIn({setCurrentUser}) {

const [loggingIn, setLoggingIn] = useState(true)
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
  console.log(formData)
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
      res.json().then((user) => {
        setCurrentUser(user)
      
      })
      .then(() => navigate("/wallet/page"))
    } else {
      res.json().then((errors) => {
        console.error(errors)
      }) //add navigate here later - same page but with an error message to the users
    }
  })
}


  return (
    <div>
      <NavBar />
      <h1 class="login-requirements">{loggingIn ? 'Enter Username and Password' : 'Please create a username and password'}</h1>

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
          type='text'
          name='password'
          required='required'
          className='input-field'
          value={formData.password}
          placeholder='Password'
          onChange={handleChange}></input>
          <div className="form-btn-container">
          <button className="btn btn-hover">Continue</button>
          {!loggingIn ? <p  className="btn btn-hover" >Log In</p>
           : <p className="btn btn-hover" >Sign Up</p>}
        </div>
      </form>
        
    </div>
  )
}

export default SignIn