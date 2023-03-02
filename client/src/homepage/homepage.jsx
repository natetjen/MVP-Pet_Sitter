import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'
import PetEntry from './PetEntry.jsx'
import Sitter from './Sitter.jsx'

function Homepage ({authUser, userSignOut}) {
  const [dataUser, setDataUser] = useState({})
  const [availability, setAvailability] = useState(false)
  const [disList, setDisList] = useState()
useEffect(() => {
  if (authUser) {
    axios.get('/petsitter', {params:{_id:authUser.uid}})
    .then((data) => {
      setDataUser(data.data[0]);
      if (data.data[0].petSitter) {
        console.log('checkthis', data.data[0].petSitter)
        setAvailability(true)
      }
    }).catch((err) => {console.log('THis is err homepage axios', err)})
  }
}, [authUser])

  const availabilityHandle = (e) => {
    console.log(dataUser._id)
    axios.put('/availability', {_id:(dataUser._id)})
      .then((data) => {setAvailability(!availability)})
      .catch((err) => {console.log(err)})
      console.log(dataUser.pets)
  }

  return (
    <div>
      <div class="header">
        <div class="welcome">Welcome! {dataUser.owner}</div>
        <img className='profilePic' src={dataUser.profilePicture} width='100' height='150'/>
        <button className='signout' onClick={(e) => userSignOut()}>Sign Out</button>
      </div>
      <div class="header1">
      <label>Availability to petsitting:
          <text hidden={!availability}>I can't wait to petsit!
            <button hidden={!availability} onClick={availabilityHandle}>Not today!</button>
          </text>
          <text hidden={availability}>{" Maybe Next time :'("}
            <button hidden={availability} onClick={availabilityHandle}>I am available now</button>
          </text>
        </label>
      </div>
      <div className="mypets">
        <h1>My Pets</h1>
        <div className='mypets-container'>
          {dataUser.pets &&
          dataUser.pets.map((pet) => {
          return (<PetEntry pet={pet} />)
          })
          }
        </div>
      </div>
      <div class="content" hidden={disList}>
        <br/>
        What would you like to do?
        <button onClick={(e) => {setDisList(true)}}>Look for petsitter around my area</button>
        <br/>
      </div>
      {disList && (
        <>
          <Sitter />
        </>
      )
      }
    </div>
  )
}

export default Homepage