import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'
import PetEntry from '../PetEntry.jsx'

function SitterEntry ({sitter}) {
  const [detail, setDetail] = useState(false)

  return (
    <div className="eachsitter" onClick={(e) => setDetail(!detail)}>
        <label>Hi! My name is {sitter.owner}</label>
        <br/>
        <label>location: {sitter.location.city +', '+ sitter.location.state}</label>
        <br/>
        <img className='sitterEntryImage' src={sitter.profilePicture} width='60' height='100'/>
        <br/>
        {detail && (
          <div className='detailModal'>
            <div>I am {sitter.owner}. I live in {sitter.location.city +', '+ sitter.location.state}.
            <p>I would be happy to petsit your pet!</p>
            <p>Please reach out to me for further information. You can email me at {sitter.email} or contact me directly to my phone, {sitter.phoneNumber}</p></div>
            {sitter.pets.length > 0 && (
              <>
                <div>Meet my pets!</div>
                {sitter.pets.map((pet) => {
                  return (<PetEntry pet={pet}/>)
                })}
              </>
            )}
          </div>
        )}
    </div>
  )
}

export default SitterEntry