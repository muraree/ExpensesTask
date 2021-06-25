import React, {useEffect, useState} from 'react'
import { Link} from "react-router-dom";
import styles from "./ExpenseEdit.module.css";
import Button from "./Button";
import axios from 'axios';
import { useAlert } from 'react-alert'

const Accounts = () => {
  const [user, setUser] = useState(false)
  const [number, setNumber] = useState();
  const [name, setName] = useState();
  const alert = useAlert()
  const [error, setError] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(true)
    }
  })
  const handleSubmit= (ev)=>{
    ev.preventDefault()
   const token =  localStorage.getItem('currentToken')
    const account={
    "number": number ,
      "name": name,
    }
  const body = JSON.stringify({ account })
  const config = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  };
  axios.post(`${process.env.REACT_APP_API_URL}/accounts`, body, config).then((response)=>{
    console.log(response.status)
    window.location = '/';
  }).catch((errors)=>{
    console.log(errors)
    if(error){
      alert.show('OOPS! Cannot Canot Post Right Now, Request Failed')
      setTimeout(()=>{
        
        setError(false)
      },5000)
    }
   
  })
  }
  return (
    <>
    {user ?
       <div>
       <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
       <fieldset>
         <div className={styles.formRow}>
           <label htmlFor="login">Accounts</label>
         </div>
 
         <div className={styles.formRow}>
           <label htmlFor="account number">Account Number: </label>
           <input
             required
             id={"number"}
             type={"number"}
             value={number}
             onChange={(ev) => setNumber(ev.target.value)}
           />
         </div>
 
         <div className={styles.formRow}>
           <label htmlFor="account name">Account Name: </label>
           <input
             required
             id={"name"}
             type={"name"}
             value={name}
             onChange={(ev) => setName(ev.target.value)}
           />
         </div>
       </fieldset>
 
       <div className={styles.formFooter}>
         <Button
           type={"submit"}
         >
           Save
         </Button>
                
       </div>
     </form>
     </div>
    :
    <p>You are no authenticated user Please <Link to="/signup">Signup</Link> or <Link to="/login">Login</Link></p>
    }   
    </>
    )
}

export default Accounts