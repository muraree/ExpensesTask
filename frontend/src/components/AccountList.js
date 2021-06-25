import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "./ExpensesPage.module.css";
import Button from "./Button";
import { useAlert } from 'react-alert'
const AccountList = () => {
  const [user, setUser] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const alert = useAlert()
  const [error, setError] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(true)
    }
    const token = localStorage.getItem('currentToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    };
    axios.get(`${process.env.REACT_APP_API_URL}/accounts`, config).then(response=>{
      setAccounts(response.data)
      localStorage.setItem('accountDetails', JSON.stringify(response.data))
    }).catch((errors)=>{
      if(error){
        alert.show('OOPS! Cannot Fetch Data Right Now, Request Failed')
        setTimeout(()=>{
          
          setError(false)
        },5000)
      }
      console.log(errors)
     
    })
  },[])
  
  return (
    <div>
      {
        user? 
        <center>
          <div className={styles.emptyState}>
            <div className={styles.emptyStateMessage}>
              Your Accounts List will be shown below.
            </div>
            <div className={styles.createButton}>
              <Button to="/accounts/new">Create Account</Button>
            </div>
          </div>
          <div>
          <table className="table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
            {accounts.map((account,i)=>(
              <tr key={i}>
                <td>{account.number}</td>
                <td>{account.name}</td>
                <td>${account.balance}</td>
                <td><Link to={`/accounts/${account.id}`}><Button>View</Button></Link></td>
              </tr>
                ))}
            </tbody>
          </table>
            
          </div>
      </center>
      :
      <>
        <div className={styles.emptyState}>
        <div className={styles.emptyStateMessage}>
        <p>You are no authenticated user Please <Link to="/signup">Signup</Link> or <Link to="/login">Login</Link></p>
        </div>
        </div>
      </>
      }
     
  </div>
  )
}

export default AccountList;
