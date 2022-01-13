import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home(){

  const [loggedIn, setLoggedIn] = useState(false)


 


  const handleLogin = () => {
    setLoggedIn(!loggedIn)
    console.log(loggedIn)
  }
  
  return (
    
    <div>
      <Navbar handleLogin={handleLogin} />
      <main className= "main-text">
        <p>Welcome, <span className="spendsy spendsy-animation">{localStorage.getItem('username')}!</span>
          <br/>
          Let's get started! <br/>Your financial snapshot is just one click away </p>
        <div className='btn-container'>
        <Link to='/wallet/page'>
          <button className='btn btn-hover' onClick={() => handleLogin()}>View My Wallet </button>
        </Link>
        <Link to = "/form">
          <button className='btn btn-hover'>Add Bill</button>
        </Link>
        </div>
      </main>

      <img 
        src="https://images.unsplash.com/photo-1579014134953-1580d7f123f3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbGV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
        alt='wallet'
        className='landing-wallet'
        />

      <div className="customer-faces">
        <img src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?k=20&m=1291208214&s=612x612&w=0&h=WbHbwklzP81iAWV0dPlQWuBLxnbqJFk81a9OZG6qvSM="
        className="customer-image"/>
        <img src="https://i.pinimg.com/originals/d1/b8/27/d1b8272dba69e9a3384f47797aa71e93.jpg  "
        className="customer-image"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPCG0L4UoRdw9Sg5_1eQuRIpR310O8Q-EpA&usqp=CAU"
        className="customer-image"/>
      </div>

      <footer>
        <h2>@FlatironSchool</h2>
        <h2>Yeison, Aidan, Andrea</h2>
      </footer>
    </div>
  
  )
}

export default Home;