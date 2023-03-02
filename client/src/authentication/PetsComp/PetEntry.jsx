import React, { useState, useEffect, createContext, useContext } from 'react';


function PetEntry({petsArray, setPetsArray, count}) {
  const [petName, setPetName] = useState('')
  const [petBreed, setPetBreed] = useState('')
  const [petAge, setPetAge] = useState(null)
  const [petWeight, setPetWeight] = useState(null)
  const [petPic, setPetPic] = useState([])
  const [petPicFiles, setPetPicFiles] = useState([])
  const [ppDis, setPPDis] = useState('')

  let petEntryObject = {}

  useEffect(() => {
    console.log('i amher')
    petEntryObject.petName = petName;
    petEntryObject.petBreed = petBreed;
    petEntryObject.petAge = petAge;
    petEntryObject.petPicFiles = petPicFiles;
    petEntryObject.petWeight = petWeight;
    petEntryObject.dog = true
    let copyA = petsArray.slice(0, count)
    let copyB = petsArray.slice(count + 1)
    copyA.push(petEntryObject)
    setPetsArray(copyA.concat(copyB))
  }, [petName, petBreed, petAge, petPicFiles])

  useEffect (() => {
    if (JSON.stringify(petsArray[count]) === JSON.stringify({})) {
      petEntryObject.petName = petName;
      petEntryObject.petBreed = petBreed;
      petEntryObject.petAge = petAge;
      petEntryObject.petPicFiles = petPicFiles;
      let copyA = petsArray.slice(0, count)
      let copyB = petsArray.slice(count + 1)
      copyA.push(petEntryObject)
      setPetsArray(copyA.concat(copyB))
    }
  }, [petsArray])

  // useEffect(() => {
  //   if(petEntryStatus) {
  //     petArray.push(petEntryObject)
  //   }
  // }, [petEntryStatus])

  const uploadPetPic = (e) => {
    let ppArrFiles = petPicFiles.slice()
    ppArrFiles.push(e.target.files[0])
    setPetPicFiles(ppArrFiles)
    const photo = URL.createObjectURL(e.target.files[0]);
    let ppArr = petPic.slice()
    ppArr.push(photo)
    setPetPic(ppArr)
    if (ppArr.length === 4) {
      setPPDis('none')
    }
  }

  // const deletePetPic = (e) => {
  //   e.preventDefault()
  //   let index = petPic.indexOf(photo)
  //   console.log(index)
  //   let ppArrFilesA = petPicFiles.slice(0, index)
  //   let ppArrFilesB = petPicFiles.slice(index+1)
  //   setPetPicFiles(ppArrFilesA.concat(ppArrFilesB))
  //   let ppArrA = petPic.slice(0, index)
  //   let ppArrB = petPic.slice(index+1)
  //   setPetPic(ppArrA.concat(ppArrB))
  //   setPPDis('')
  // }

  return (
    <div className = 'pet-entry'>
      <form>
        <input type='text' placeholder={"Enter your pet's name"} value={petName} onChange={(e) => setPetName(e.target.value)}/>
        <input type='text'  placeholder={"Enter your pet's breed"} value={petBreed} onChange={(e) => setPetBreed(e.target.value)}/>
        <input type='number' placeholder={"Enter your pet's age in years"} value={petAge} onChange={(e) => setPetAge(e.target.value)}/>
        <input type='number' placeholder={"Enter your pet's weight in lbs"} value={petWeight} onChange={(e) => setPetWeight(e.target.value)}/>
        <label>Upload up to 4 images
          <input type='file' className='petPic' onChange={uploadPetPic} style={{display:ppDis}}/>
          {petPic.length !== 0 &&
          petPic.map((photo) => {
            return (
            <>
              <img src={photo} width='200' height='300'/>
              <button onClick={
                (e) => {
                  e.preventDefault()
                  let index = petPic.indexOf(photo)
                  let ppArrFilesA = petPicFiles.slice(0, index)
                  let ppArrFilesB = petPicFiles.slice(index+1)
                  setPetPicFiles(ppArrFilesA.concat(ppArrFilesB))
                  let ppArrA = petPic.slice(0, index)
                  let ppArrB = petPic.slice(index+1)
                  setPetPic(ppArrA.concat(ppArrB))
                  setPPDis('')
                }}>x</button>
            </>
            )
          })}
        </label>
      </form>
    </div>
  );
}

export default PetEntry
