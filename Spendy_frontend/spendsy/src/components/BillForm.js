import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";



function BillForm({currentUser}) {
  
  const [billList, setBillList] = useState([]);
  const [formData, setFormData] = useState({
    bill_name: "",
    bill_amount: null,
    category_name: "",
    wallet_id: null,
  });


const clearState = () => {
    setFormData(
    {bill_name: "",
    bill_amount: '',
    category_name: "",
    wallet_id: ''
  })
}



  const handleData = (dataValue) => {
    const { bill_name, bill_amount, category_name, wallet_id} = dataValue;
    fetch(`/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bill_name,
        bill_amount,
        category_name,
        wallet_id,
        user_id: currentUser.id
      })
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


  return (
    <div>
      {currentUser &&
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
        <label>Wallet:</label>
        <br />
        <select
          className="input-field"
          value={formData.wallet_id}
          onChange={addToBills}
          name="wallet_id"
        >
          <option></option>

          {currentUser.wallets.map(wallet => {
            return <option value={wallet.id}>{wallet.name}</option>
          })}  
        </select>
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
     }
    </div>
  );
}

export default BillForm;




