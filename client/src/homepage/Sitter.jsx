import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'
import SitterEntry from './Sitter Comp/SitterEntry.jsx'

function Sitter ({sitter}) {
  const [zip, setZip] = useState(null)
  const [radius, setRadius] = useState(null)
  const [sitterList, setSitterList] = useState([])

  let searchZip = (e) => {
    axios.get('/searchSitter', {params:{zip:zip, radius:radius}})
      .then((data) => {setSitterList(data.data)})
      .catch((err) => {console.log(err)})
  }


  return (
    <>
    <div className="sitter">
      <input type='Number' placeholder='input the zip you want to search' value={zip} onChange={(e) => setZip(e.target.value)}/>
      <input type='Number' placeholder='input radius in miles' value={radius} onChange={(e) => setRadius(e.target.value)} />
      <button onClick={searchZip}>search</button>
      <div className='sitterList-continer'>
      <h1>Pet-Sitter List</h1>
        {sitterList.length > 0 && sitterList.map((sitter) => { console.log(sitter)
        return (<SitterEntry sitter={sitter}/>)
      })}
      </div>
    </div>
    </>
  )
}

export default Sitter