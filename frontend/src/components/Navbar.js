import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { useNotifications } from "./Notifications";
const Navbar = () => {
  const [user, setUser] = useState(false)

  const { notifyError } = useNotifications();
  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(true)
    }else{
      setTimeout(()=>{
        notifyError("Please login and try again");
      },5000)
    }
  })
  const handleLogout = (ev) =>{
    ev.preventDefault()
    localStorage.removeItem('user')
    localStorage.removeItem('currentToken')
    localStorage.removeItem('accountDetails')
    window.location = '/';
  }
  return (
      <div className={styles.app}>
          <nav className={styles.mainNav}>
            <div className={styles.navInner}>
              <h1 className={styles.title}>Expense Tracker</h1>
              <ul>
                {/*condtion based rendering*/ }
                {
                  user?
                    <>
                    <li>
                    <Link to={"/"}>Accounts</Link>
                  </li>

                  <li>
                    <Link onClick={handleLogout}>LogOut</Link>
                  </li>               
                  </>:
                  <>
                  <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>SignUp</Link>
                </li>
                </>
                }
              </ul>
            </div>
          </nav>
    </div>
  )
}

export default Navbar;
