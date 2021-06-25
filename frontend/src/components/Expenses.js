import React, { useEffect, useState } from 'react'
import { Link,useParams } from "react-router-dom";
import styles from "./ExpenseEdit.module.css";
import Button from "./Button";
import axios from 'axios';
import { useAlert } from 'react-alert'

const Expenses = () => {
  const [amount, setAmmount] = useState()
  const [date, setDate] = useState()
  const [description, setDescription] = useState()
  const [error, setError] = useState(true);
  const alert = useAlert()
  const id = useParams()
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const data ={
      amount: amount,
      date: date,
      description: description,
      account_id: id.id
    }
    const token = localStorage.getItem('currentToken')
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL}/expenses`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });
      const newData = await res.json()
      console.log(newData)
      if(newData.errors && error) {
        alert.show(`SORRY! ${newData.errors}`)
          setTimeout(()=>{
            
            setError(false)
          },5000)
      }else{
  
        window.location = `/expenses/${id.id}`;
      }
    
    }catch(errors){
      console.log(errors)
    }
  
  }
  return (
    <div>
      <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
        <fieldset>

        <label htmlFor="amount">Create Expenses</label>
          <div className={styles.formRow}>
            <label htmlFor="amount">Amount</label>
            <input
              required
              min={"0"}
              id={"amount"}
              type={"number"}
              value={amount}
              onChange={e => setAmmount(e.target.value)}
            />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="date">Date</label>
            <input
              required
              id={"date"}
              type={"date"}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="description">Description</label>
            <input
              required
              id={"description"}
              type={"text"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </fieldset>

        <div className={styles.formFooter}>
          <Button kind={"danger"}>
            Delete
          </Button>
          <Button
            type={"submit"}
          >
            Save
          </Button>
        </div>
        <div>
        </div>
      </form>
    </div>
  )
}

export default Expenses