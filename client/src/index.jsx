import React, { useState, useEffect, createContext, useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import SignIn from './authentication/SignIn.jsx'
import SignUp from './authentication/SignUp.jsx'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from './firebase'

function App() {
  const [createNew, setCreateNew] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const [authUser, setAuthUser] = useState(null)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    console.log(authUser)
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
  }, [trigger])

  const userSignOut = () => {
    signOut(auth)
    setAuthUser(null)
  }

  return (
<div>
  {!authUser && (
    <div>
      <SignIn setCreateNew={setCreateNew} trigger={trigger} setTrigger={setTrigger}/>
      {createNew && (
        <SignUp />
      )}
    </div>
  )}
  {authUser && (
  <>
    <div>hello</div>
    <button onClick={(e) => userSignOut()}>Sign Out</button>
  </>
  )}
</div>

  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
