import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'

function PetEntry ({pet}) {

  return (
    <div className="eachpet">
        <label>Name: {pet.petName}</label>
        <br/>
        <label>Breed: {pet.petBreed}</label>
        <br/>
        <label>Age: {pet.petAge}</label>
        <br/>
        <label>Weight: {pet.weight}</label>
        <br/>
        {
        pet.petPicFiles.length > 0 &&
        pet.petPicFiles.map((pic) => {
          return ( <img className='petEntryImage' src={pic} width='60' height='100'/>)
        })
        }
    </div>
  )
}

export default PetEntry