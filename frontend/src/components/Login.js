import React, { useEffect, useState } from "react";
import styles from "./ExpenseEdit.module.css";
import Button from "./Button";
import { useAlert } from 'react-alert'
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState(true);
  const alert = useAlert()
  const handleSubmit = async (ev) => {
    ev.preventDefault()
   
  try{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
      method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
    });
    const data = await res.json()
    console.log(data);
    setUser(res.data)
    if(data.errors && error){
      alert.show('OOPS! Login Authentication Failed!')
        setTimeout(()=>{
          
          setError(false)
        },5000)
      
    }
    if(data.user){

      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('currentToken', JSON.stringify(data.token))
      setUser(data.user)
      window.location = '/';
    }
  }catch(errors){
    console.log(errors)
  }
  
}
  return (
    <div>
      
      <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
      <fieldset>
        <div className={styles.formRow}>
          <label htmlFor="login">Login</label>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="emailId">Email ID: </label>
          <input
            required
            id={"email"}
            type={"email"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="password">Password: </label>
          <input
            required
            id={"password"}
            type={"password"}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.formFooter}>
        <Button
          type={"submit"}
        >
          Login
        </Button>
      </div>
    </form>
    </div>
  )
}

export default Login;
