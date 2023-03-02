import React, { useState, useEffect, createContext, useContext } from 'react';
import PetEntry from './PetsComp/PetEntry.jsx'


function Pets({petsArray, setPetsArray}) {
  let count = -1;
  return (
    <div className = 'pets-container'>
      {petsArray.map((pet) => {
        count++
        return (<PetEntry petsArray={petsArray}
          setPetsArray={setPetsArray} count={count}/>)
      })}
    </div>
  );
}

export default Pets
