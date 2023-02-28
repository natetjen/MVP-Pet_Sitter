import React, { useState, useEffect, createContext, useContext } from 'react';
import PetEntry from './PetsComp/PetEntry.jsx'


function Pets({petsArray, pets}) {
  console.log(petsArray.length)
  return (
    <div className = 'pets-container'>
      {petsArray.map((pet) => {
        console.log('hello')
        return (<PetEntry petArray={pets}/>)
      })}
    </div>
  );
}

export default Pets
