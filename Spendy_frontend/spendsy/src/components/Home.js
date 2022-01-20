import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home({currentUser}){
console.log(currentUser)
  
  
  return (
    
    <div>
      <main className= "main-text">
        <p>Welcome, <span className="spendsy spendsy-animation">{currentUser.first_name}!</span>
          <br/>
          Let's get started! <br/>Your financial snapshot is just one click away </p>
        <div className='btn-container'>
        <Link to='/wallet/page'>
          <button className='btn btn-hover'>View My Wallet </button>
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
      <img src="https://www.kindpng.com/picc/m/673-6735417_young-lady-smiling-radiantly-smiling-black-lady-png.png"
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