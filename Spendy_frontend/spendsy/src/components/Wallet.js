import { useEffect, useState } from "react";


function Wallet({currentUser, currentWallet, currentUser:{bills}}) {
  
  useEffect(() => {
    fetch(`/userwallet/${currentWallet.id}`)
    .then(resp => resp.json())
    .then(data => setWalletBills(data.bills))

    fetch(`/total/${currentWallet.id}`)
    .then(resp => resp.json())
    .then(total => setTotal(total))
  }, [])

  // State Variables
  const [walletBills, setWalletBills] = useState([])
  const [total, setTotal] = useState(0)
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [changeFunds, setChangeFunds] = useState(false)
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowkey: null
  })


  const [walletInfo, setWalletInfo] = useState({
    name: currentWallet.name,
    funds: 0
  })

 const fundStyle = () => {
   if(total > currentWallet.amount) {
     return 'red'
   } else {
     return 'white'
   }
 }

// Set table row to edit mode
  const onEdit = ({id}) => {
    setInEditMode({
        status: !inEditMode.status,
        rowKey: id
    })
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


const changeWallet = () => setChangeFunds(!changeFunds)

const handleWalletInfo = (e) => {
  setWalletInfo({ ...walletInfo, [e.target.name]: e.target.value });
}

const updateWalletInfo = (id) => {
  const updatedWallet = {
    name: walletInfo.name,
    amount: walletInfo.funds
  }
  fetch (`/wallets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedWallet)
  })
  .then(resp => resp.json())
  .then(() => {
    setChangeFunds(false)
    window.location.reload()
  })
}
// reset the inEditMode state value
  const onCancel = () => {
    setInEditMode({
        status: false,
        rowKey: null
    })
}




// Get all the bills for the wallet (after deleting or editing a bill)
  const getBills = (currentWallet) => {
    fetch(`/userwallet/${currentWallet}`)
    .then(resp => resp.json())
    .then(data => setWalletBills(data.bills))
  }

// Get Total from all bill amounts
  const getTotal = () =>{
    fetch(`/total/${currentWallet.id}`)
    .then(resp => resp.json())
    .then(totalValue => setTotal(totalValue))
  }

// Clears all state so next edit fields are empty
  const clearState = () => {
  setBillName('')
  setBillAmount(null)
  setCategoryName('')
  }

 


//  Delete a bill
  function handleBillDelete(id, currentWallet){
     if(window.confirm("Are you sure you want to delete this bill?")){
        fetch(`/bills/${id}`,{
         method: "DELETE",  
        })
        .then(() => {
          // fetch the updated data
          getBills(currentWallet)
          getTotal()
      })
  }
}

// EDIT ROW/PATCH FUNCTIONS
const updateRow = ({id, bill_name, bill_amount, category_name}, currentWallet) => {
  fetch(`/bills/${id}`, {
      method: "PATCH",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
          bill_name: bill_name,
          bill_amount: bill_amount,
          category_name: category_name
      })
  })
      .then(response => response.json())
      .then(() => {
        // reset inEditMode and unit price state values
        onCancel();

        // fetch the updated data
        getBills(currentWallet)
        getTotal()
        clearState()
    })
}

 //  Delete a Wallet 
 function handleWalletDelete(id, currentWallet){
  if(window.confirm("Are you sure you want to delete this Wallet?")){
     fetch(`/wallets/${id}`,{
      method: "DELETE",  
     })
     .then(() => {
       console.log("deleted")
      //  fetch the updated data
       getBills(currentWallet)
      
   })
  
}
}


// ---------------------------------------------------------------------

  return (
    <div className="wallet-table">
      {walletBills && currentUser &&
      <>
      

      <div className="wallet-info">
        <h1 className="wallet-name">
          
          {changeFunds ? 
            <i class="fas fa-edit" onClick={() => updateWalletInfo(currentWallet.id)}></i> : <i class="fas fa-edit" onClick={() => changeWallet()}></i>  
          }


          {/* delete icon */}
          {<i class="fas fa-trash-alt" onClick={() => handleWalletDelete(currentWallet.id)} ></i>}
        
          {changeFunds ? 
          <input type="text" 
          name="name"
          value={walletInfo.name} 
          onChange={(e) => handleWalletInfo(e)} 
          placeholder={currentWallet.name}></input>: currentWallet.name}
        </h1>
          {changeFunds ? 
          <input type="number" 
          name="funds"
          value={walletInfo.funds} 
          onChange={(e) => handleWalletInfo(e)} 
          placeholder={currentWallet.amount}></input>: 
          <h1 className="wallet-amount">
             Funds: {currentWallet.amount}

             

             
          </h1>}
        
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
              <button className="edit-btn table-btn" onClick={() => updateRow({id: bill.id, bill_name: billName, bill_amount: billAmount, category_name: categoryName}, currentWallet.id)}>
                Save</button>
              <button className="edit-btn table-btn" onClick={() => handleBillDelete(bill.id, currentWallet.id)}>Delete</button> 
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
          <p style={{color: fundStyle()}}>Remaining Funds: {currentWallet.amount - total}</p>
         </td>
        </tfoot>
      </table>
      </>
  }
    </div>
  );
}

export default Wallet;
