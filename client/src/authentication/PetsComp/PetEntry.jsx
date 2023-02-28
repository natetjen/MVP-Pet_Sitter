import React, { useState, useEffect, createContext, useContext } from 'react';


function PetEntry({petArray}) {

  return (
    <div className = 'pet-entry'>
      <form>
        <input type='text' placeholder={"Enter your pet's name"}/>
        <input type='text'  placeholder={"Enter your pet's breed"}/>
        <input type='number' placeholder={"Enter your pet's age"}/>
        <input type='number' placeholder={"Enter your pet's weight"}/>
        <input type='file'/>
      </form>
    </div>
  );
}

export default PetEntry
