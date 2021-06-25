import React, {useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom";
import styles from "./ExpenseEdit.module.css";
import axios from 'axios';
import { useAlert } from 'react-alert'
import Button from "./Button";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const id = useParams()
  const alert = useAlert()
  const [error, setError] = useState(true);
  useEffect(()=>{
    const token = localStorage.getItem('currentToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    };
    axios.get(`${process.env.REACT_APP_API_URL}/expenses?account_id=${id.id}`, config).then(response=>{
      setExpenses(response.data) 
      console.log(response)
    }).catch((errors)=>{
      if(error){
        alert.show('OOPS! Cannot Fetch the listing Right Now, Request Failed!')
        setTimeout(()=>{
          
          setError(false)
        },5000)
      }
      console.log(errors)
    })
  })
  return (
    <div>
      <center>
        <Button to={`/account/expenses/${id.id}`}>Create Expenses</Button>
     
      <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {expenses.map((expense,i)=>(
              <tr key={i}>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                
              </tr>
                ))}
            </tbody>
          </table>
        </center>
    </div>
  )
}

export default ExpenseList;