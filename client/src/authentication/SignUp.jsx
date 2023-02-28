import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import {auth} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import Pets from './Pets.jsx'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [petsNum, setPetsNum] = useState(0)
  const [petSitter, setPetSitter] = useState(null)
  const [petsArray, setPetsArray] = useState([])

  let pets = [];

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
   setPassword(e.target.value)
  }

  const signUp = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {console.log(credential.user.uid)})
      .catch((err) => {setWarning('')})
  }


  return (
    <div className = 'sign-up-container'>
      <form onSubmit={signUp}>
        <h1>Create an Account</h1>
        <input type='email' placeholder='Enter you email' value={email} onChange={emailHandler}/>
        <input type='password' placeholder='Enter your password' value={password} onChange={passwordHandler}/>
        <br/>
        <br/>
        <label>Upload a profile picture
          <input type='file'/>
        </label>
        <br/>
        <br/>
        <label>What is your name? <input type='text' value={name} onChange={(e) => setName(e.target.value)}/></label>
        <br/>
        <label>What is the best phone number to reach you? <input type='number' value={number} onChange={(e) => setNumber(e.target.value)}/></label>
        <br/>
        <label>How many pets do you have? <input type='number' min='0' value={petsNum} onChange={(e) => {setPetsNum(e.target.value); setPetsArray(Array(Number(e.target.value)).fill(0))}}/></label>
        {petsNum > 0 && (<Pets petsArray={petsArray} pets={pets}/>)}
        <br/>
        <label>Do you want to be a pet-sitter?
          <br/>
          <label>
           <input name='petsitter' type='radio' value={true} onChange={(e) => setPetSitter(e.target.value)}/> Of Course!
          </label>
          <br/>
          <label>
            <input name='petsitter' type='radio' value={false} onChange={(e) => setPetSitter(e.target.value)}/>{" I am not ready :'("}</label>
          </label>
          <br/>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default SignUp
