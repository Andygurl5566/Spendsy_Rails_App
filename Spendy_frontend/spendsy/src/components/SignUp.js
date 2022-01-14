import NavBar from "./Navbar"
import {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'

function SignUp({setCurrentUser}) {

function navToSignin(){
 navigate("/signin")
}  

const [loggingIn, setLoggingIn] = useState(true)
const navigate = useNavigate()
const [formData, setFormData] = useState({
  email: "",
  first_name: "",
  last_name: "",
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
  const userCreds = { ...formData };

  fetch(`/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCreds),
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
      <h1 class="login-requirements">{loggingIn ? <> <h3>Signup</h3> <br></br> Please create a username and password</>:'Enter Username and Password' }</h1>
      <form className="bill-entry login-form" onSubmit={handleSubmit}>
      <label>First Name: </label>
        <input
          type='text'
          className='input-field'
          name= 'first_name'
          required='required'
          value={formData.first_name}
          placeholder='First Name'
          onChange={handleChange}></input>

        <label>Last Name: </label>
        <input
          type='text'
          className='input-field'
          name= 'last_name'
          required='required'
          value={formData.last_name}
          placeholder='Last Name'
          onChange={handleChange}></input>

      <label>Email: </label>
        <input
          type='text'
          className='input-field'
          name= 'email'
          required='required'
          value={formData.email}
          placeholder='Email'
          onChange={handleChange}></input>
        

        <label>Password (8 characters or more ): </label>
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
           : <p className="btn btn-hover" onClick={navToSignin}>Login</p>}
           <button className="btn btn-hover">Continue</button>
        </div>
      </form>
        
    </div>
  )
}

export default SignUp