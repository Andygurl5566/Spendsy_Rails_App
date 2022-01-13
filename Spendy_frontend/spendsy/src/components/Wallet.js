import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Wallet() {
  // Global States
  const [wallet, setWallet] = useState({})
  const [walletBills, setWalletBills] = useState([])
  const [total, setTotal] = useState(0)


  // Edit Table Data States
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowkey: null
  })

  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState(null)
  const [categoryName, setCategoryName] = useState('')

  const onEdit = ({id}) => {
    setInEditMode({
        status: !inEditMode.status,
        rowKey: id
    })
  }

  // Fetch on load
  useEffect(() => {
    fetch(`http://localhost:9292/user/wallets/bills/${localStorage.getItem('username')}`)
    .then(resp => resp.json())
    .then(user => {
      setWalletBills(user.wallets[0].bills)
      console.log(user.wallets[0].bills)
    })
  }
  , [])
  
  useEffect( () =>{
    fetch(`http://localhost:9292/user/wallets/${localStorage.getItem('username')}`)
    .then(resp => resp.json())
    .then(user => setWallet(user.wallets[0]))
  }
  , [])
  
  useEffect ( () => {
    fetch(`http://localhost:9292/user/wallets/bills/total/${localStorage.getItem('username')}`)
    .then(resp => resp.json())
    .then(totalValue => setTotal(totalValue))
  }, [])

  
  

//  Delete specific Bill
  function handleWalletDelete(id){

     if(window.confirm("Are you sure you want to delete this bill?")){
        fetch(`http://localhost:9292/bill/${id}`,{
         method: "DELETE",  
  })
        .then((r) => r.json())
        .then((deletedWallet) => console.log(deletedWallet))
        .then(json => {
          // fetch the updated data
          getBills()
          getTotal()
      })
  }
}


// Get all the bills in the first wallet
const getBills = () => {
  fetch(`http://localhost:9292/user/wallets/bills/${localStorage.getItem('username')}  `)
    .then(resp => resp.json())
    .then(user => setWalletBills(user.wallets[0].bills))
}

// Get Total from all bill amounts
const getTotal = () =>{
    fetch(`http://localhost:9292/user/wallets/bills/total/${localStorage.getItem('username')}`)
    .then(resp => resp.json())
    .then(totalValue => setTotal(totalValue))
  }

// Clears all state so next edit fields are empty
const clearState = () => {
  setBillName('')
  setBillAmount(null)
  setCategoryName('')
}
// Handle State on change functions
const handleBillName = (e) => {
  setBillName(e.target.value)
}

const handleBillAmount = (e) => {
  setBillAmount(e.target.value)
}

const handleCategoryName = (e) => {
  setCategoryName(e.target.value)
}


// EDIT ROW/PATCH FUNCTIONS
const updateRow = ({id, bill_name, bill_amount, category_name}) => {
    console.log(bill_name)
    fetch(`http://localhost:9292/bill/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            bill_name: bill_name,
            bill_amount: bill_amount,
            category_name: category_name
            // bill_amount: bill_amount
        })
    })
        .then(response => response.json())
        .then(json => {
          // reset inEditMode and unit price state values
          onCancel();

          // fetch the updated data
          getBills()
          getTotal()
          clearState()
      })
}

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
        status: false,
        rowKey: null
    })
}


// ---------------------------------------------------------------------

  return (

    
    <div className="wallet-container">
      <Link to="/form">

        <button className="new-wallet-btn btn-hover">Add New Bill</button>
      </Link>
{/* Wallet Header and Info */}
      <div className="wallet-info">
        <h1 className="wallet-name">{wallet.wallet_name}</h1>
        <h1 className="wallet-amount">Funds: {wallet.amount}</h1>
      </div>
      <table className="bills">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
{/* Dynamic Table Body */}
        <tbody>
          {walletBills.map((bill) =>
            <tr key={bill.id}>
              <td>
                {inEditMode.status && inEditMode.rowKey === bill.id ? (
                    <input 
                      value={billName}
                      placeholder={bill.bill_name}
                     onChange={(e) => handleBillName(e)}
                    />
                ) : bill.bill_name}
                    </td>
              
              <td>
                {inEditMode.status && inEditMode.rowKey === bill.id ? (
                    <input 
                    type="number"
                    value={billAmount}
                    placeholder = {bill.bill_amount}
                    onChange={(e) => handleBillAmount(e)}
                    />
                ) : bill.bill_amount}
                    </td>

              <td>
                {inEditMode.status && inEditMode.rowKey === bill.id ? (
                    <select onChange={(e) => handleCategoryName(e)}>
                      <option value="Select">category: </option>
                      <option value="Housing">Housing</option>
                      <option value="Personals">Personals</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Savings">Savings</option>
                      <option value="Misc">Misc.</option>
                    </select>
                ) : bill.category_name}
                    </td>
{/* Wallet Buttons */}
            <td>
              {inEditMode.status && inEditMode.rowKey === bill.id ? 
            <>
              <button className="edit-btn table-btn" onClick={() => updateRow({id: bill.id, bill_name: billName, bill_amount: billAmount, category_name: categoryName})}>
                Save</button>
              <button className="edit-btn table-btn" onClick={() => handleWalletDelete(bill.id)}>Delete</button> 
            </> 
            :<button className=" edit-btn table-btn" onClick={() => onEdit({id: bill.id, currentBillName: billName, currentBillAmount: billAmount, currentCategoryName: categoryName})}>
                Edit
                </button>}
              </td>
            </tr>
          )}
        </tbody>
{/* Wallet Footer & totals */}
        <tfoot>
        <td><p>Total Costs:</p></td>
        <td>{total}</td>
        <td></td>
        <td>
          <p>Remaining Funds: {wallet.amount - total}</p>
         </td>
        </tfoot>
      </table>
    </div>
  );
}

export default Wallet;
