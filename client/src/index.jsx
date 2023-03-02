import React, { useState, useEffect, createContext, useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import SignIn from './authentication/SignIn.jsx'
import SignUp from './authentication/SignUp.jsx'
import Homepage from './homepage/homepage.jsx'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from './firebase'

function App() {
  const [createNew, setCreateNew] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const [authUser, setAuthUser] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const [homepageDis, setHomePageDis] = useState(false)

  useEffect(() => {
    if (auth.currentUser) {
      setAuthUser(auth.currentUser)
      } else {
      setAuthUser(null)
    }
    // const listen =onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log('is this without being triggered')
    //     setAuthUser(user)
    //   } else {
    //     setAuthUser(null)
    //   }
    // })
  }, [trigger])

  useEffect(() => {
    if (authUser) {
      setHomePageDis(true)
      console.log('this is authUser', authUser)
    } else {
      setHomePageDis(false)
    }
  }, [authUser])

  const userSignOut = () => {
    setAuthUser(null)
    signOut(auth)
  }

  return (
<div className='app'>
  {!authUser && (
      <header>
      <div class="logo">
          <img className='petSitter logo' src="https://res.cloudinary.com/dsiywf70i/image/upload/v1677701650/pet-sitting-logo-by-larry-sickmann-dribbble_qmerbm.png" width='50%' height='50%' />
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
      </header>
  )}
  {!authUser && (
    <div>
      <SignIn setCreateNew={setCreateNew} trigger={trigger} setTrigger={setTrigger}/>
      {createNew && (
        <SignUp backStatus={createNew} setBack={setCreateNew} setHomePageDis={setHomePageDis} trigger={trigger} setTrigger={setTrigger} setCreateNew={setCreateNew}/>
      )}
    </div>
  )}
  {(homepageDis && authUser) && (
  <div className='homepage-container'>
    {/* <button className='signout' onClick={(e) => userSignOut()}>Sign Out</button> */}
    <Homepage authUser={authUser} userSignOut={userSignOut}/>
  </div>
  )}
</div>

  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
