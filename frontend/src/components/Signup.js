import React, { useEffect, useState } from "react";
import styles from "./ExpenseEdit.module.css";
import Button from "./Button";
import axios from 'axios';
import { useAlert } from 'react-alert'

const Signup = () => {
  console.log(process.env.REACT_APP_API_URL)
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const alert = useAlert()
  const [error, setError] = useState(true);

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const user={
      "email": emailId,
      "password": password,
      "password_confirmation": confirmPassword
    }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios.post(`${process.env.REACT_APP_API_URL}/users`, {user}, config).then((response)=>{
    console.log(response.status)
    window.location = '/login';
  }).catch((errors)=>{
    if(error){
      alert.show('OOPS! Signup Authentication Failed!')
      setTimeout(()=>{
        
        setError(false)
      },5000)
    }
    
    console.log(errors)
  })
  }
  return (
    <div>
      <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
      <fieldset>
        <div className={styles.formRow}>
          <label htmlFor="signup">SignUp</label>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="emailId">Email-Id</label>
          <input
            required
            id={"email"}
            type={"email"}
            name="email"
            value={emailId}
            onChange={e => setEmailId(e.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="password">Password</label>
          <input
            required
            id={"password"}
            name="password"
            type={"password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password">Confirm Password</label>
          <input
            required
            id={"confirmpassword"}
            name="confirmPassword"
            type={"password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
      </fieldset>
      <div className={styles.formFooter}>
        <Button
          type={"submit"}
        >
          SignUp
        </Button>
      </div>
    </form>
    </div>
  )
}

export default Signup;
