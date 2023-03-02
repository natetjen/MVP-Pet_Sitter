import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import {auth} from '../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import useHistory from 'react-router-dom'

function SignIn({setCreateNew, trigger, setTrigger}) {
  // let history = useHistory()
  // history.push('/SignUp')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('none')

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
   setPassword(e.target.value)
  }

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential.user.uid)
        setTrigger(!trigger)
      })
      .catch((err) => {setWarning('')})
  }

  return (
    <div className = 'sign-in-container'>
      <form className='login-form'>
        <h1 className='login text'>Log In</h1>
        <input type='email' placeholder='Enter you email' value={email} onChange={emailHandler}/>
        <input type='password' placeholder='Enter your password' value={password} onChange={passwordHandler}/>
        <button onClick={signIn}>Log In</button>
        <br/>
        <div className='warning' style={{display:warning}}>Username or Password is incorrect</div>
      </form>
      <button onClick={()=>setCreateNew(true)}>Create a new Account</button>
    </div>
  );
}
export default SignIn
