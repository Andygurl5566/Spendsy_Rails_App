import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";



function WalletForm() {
  
  const [wallet, setWallet] = useState({})
  const [billList, setBillList] = useState([]);
  const [formData, setFormData] = useState({
    bill_name: "",
    bill_amount: "",
    category_name: "",
  });

   useEffect( () =>{
    fetch(`http://localhost:9292/user/wallets/${localStorage.getItem('username')}`)
    .then(resp => resp.json())
    .then(user => {
      // setWallet(wallets)
      setWallet(user.wallets[0])
    })
  }
  , [])

const clearState = () => {
    setFormData(
    {bill_name: "",
    bill_amount: "",
    category_name: ""
  })
}


  const handleData = (dataValue) => {
    const { bill_name, bill_amount, category_name } = dataValue;
    fetch(`http://localhost:9292/user/wallets/bills/${localStorage.getItem('username')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bill_name: bill_name,
        bill_amount: bill_amount,
        category_name: category_name,
        wallet_id: wallet.id
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBillList(data);
      })
      
      clearState()
  };

  const handleSubmitForm = (e) => {
    if(window.confirm("Your new bill has been added to your wallet!")){
    e.preventDefault();
    handleData(formData);
  }
};

  const addToBills = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
console.log(formData)


  return (
    <div>
      <NavBar />
      <form className="bill-entry" onSubmit={(e) => handleSubmitForm(e)}>
        <label>Bill:</label>
        <br />
        <input
          type="text"
          name="bill_name"
          placeholder="Bill Name"
          className="input-field"
          value={formData.bill_name}
          onChange={addToBills}
        ></input>
        <br />
        <label>Cost:</label>
        <br />
        <input
          type="number"
          name="bill_amount"
          placeholder="Cost"
          className="input-field"
          value={formData.bill_amount}
          onChange={addToBills}
        ></input>
        <br />
        <label>Category:</label>
        <br />
        <select
          className="input-field"
          value={formData.category_name}
          onChange={addToBills}
          name="category_name"
        >
          <option value="Select">category: </option>
          <option value="Housing">Housing</option>
          <option value="Personals">Personals</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Savings">Savings</option>
          <option value="Misc">Misc.</option>
        </select>
        <br />
        <br />
        <div className="form-btn-container">
          <button type="submit" className="btn btn-hover">
            Add Bill
          </button> 
          <Link to="/wallet/page">
        <button type="submit" className="btn btn-hover">
            Return to Wallet
          </button>
          </Link>
        </div>
      </form>
     
    </div>
  );
}

export default WalletForm;




