import React, {useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom";
import styles from "./ExpenseEdit.module.css";
import Button from "./Button";
import axios from 'axios';
import { useAlert } from 'react-alert'

const EditAccount = () => {
  const [user, setUser] = useState(false)
  const [number, setNumber] = useState();
  const [name, setName] = useState();
  const {id} = useParams();
  const alert = useAlert()
  const [error, setError] = useState(true);
  const [updateError, setUpdateError] = useState(true);
  const [deleteError, setDeleteError] = useState(true);
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
    axios.get(`${process.env.REACT_APP_API_URL}/accounts/${id}`, config).then(response=>{
      const data = response.data
      setNumber(data.number)
      setName(data.name)
    }).catch((errors)=>{
      if(error){
        alert.show('OOPS! Cannot Edit Right Now, Request Failed')
        setTimeout(()=>{
          
          setError(false)
        },5000)
      }
   
      console.log(errors)

    })
  },[])
  const handleUpdate= (ev)=>{
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
  axios.put(`${process.env.REACT_APP_API_URL}/accounts/${id}`, body, config).then((response)=>{
    console.log(response.status)

    window.location = '/';
  }).catch((errors)=>{
    if(updateError){
      alert.show('OOPS! Cannot Edit Data Right Now, Request Failed')
      setTimeout(()=>{
        
        setUpdateError(false)
      },5000)
    }
    console.log(errors)
   
  })
  }

  const handleDelete = (ev) =>{
    ev.preventDefault()
    console.log(id)
    const token =  localStorage.getItem('currentToken')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  };
  axios.delete(`${process.env.REACT_APP_API_URL}/accounts/${id}`, config).then((response)=>{
    console.log(response.status)  
  window.location = '/';
  }).catch((errors)=>{
    if(deleteError){
      alert.show('OOPS! Cannot Delete Data Right Now, Request Failed')
      setTimeout(()=>{
        
        setDeleteError(false)
      },5000)
    }
    console.log(errors)
   
  })
  }
  return (
    <>
    {user ?
       <div>
       <form autoComplete={"off"} onSubmit={handleUpdate} className={styles.form}>
       <fieldset>
         <div className={styles.formRow}>
           <label htmlFor="login">Accounts</label>
         </div>
 
         <div className={styles.formRow}>
           <label style={{width:'230px'}} htmlFor="account number">Edit Account Number: </label>
           <input
             required
             id={"number"}
             type={"number"}
             value={number}
             onChange={(ev) => setNumber(ev.target.value)}
           />
         </div>
 
         <div className={styles.formRow}>
           <label style={{width:'230px'}} htmlFor="account name">Account Name: </label>
           <input
             required
             id={"name"}
             type={"name"}
             value={name}
             onChange={(ev) => setName(ev.target.value)}
           />
         </div>
       </fieldset>       
       <div style={{padding:'10px'}} className={styles.formFooter}>
         <Button
           type={"submit"}
         >
           Update
         </Button> 
         <div style={{padding:'10px'}} className={styles.formFooter}>
              
              <form  autoComplete={"off"} onSubmit={handleDelete} className={styles.form}>
                <Button style={{paddingLeft:'30px'}} type={"delete"} kind={"danger"}>
                  Delete
                </Button>
              </form>    
             </div> 
             <Button to={`/expenses/${id}`}>
                View Expenses
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

export default EditAccount
