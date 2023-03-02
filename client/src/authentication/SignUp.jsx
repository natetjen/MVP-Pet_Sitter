import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import {auth} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import Pets from './Pets.jsx'
import axios from 'axios'

function SignUp({backStatus, setBack, trigger, setTrigger, setCreateNew}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [petsNum, setPetsNum] = useState(0)
  const [petSitter, setPetSitter] = useState(null)
  const [petsArray, setPetsArray] = useState([])
  const [profilePhoto, setProfilePhoto] = useState('')
  const [ppFile, setPPfile] = useState('')
  const [ppDis, setPPDis] = useState('')
  const [zip, setZip] = useState(null)
  const [spinnerDis, setSpinnerDis] = useState(false)
  const [warning, setWarning] = useState('none')

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
   setPassword(e.target.value)
  }

  const signUp = async (e) => {
    e.preventDefault();
    let sitterObject = {};
    if (name === '' || number === '' || petSitter === null || zip === null) {
      setWarning('')
      return
    }
    setSpinnerDis(true)
  const options = {
    method: 'GET',
    url: 'https://community-zippopotamus.p.rapidapi.com/us/' + zip,
    headers: {
      'X-RapidAPI-Key': '31a778f717msh94e1b9c31e9490ap173107jsn5f1a5cacc670',
      'X-RapidAPI-Host': 'community-zippopotamus.p.rapidapi.com'
    }
  };
  await axios.request(options).then(function (response) {
    sitterObject.location = {}
    console.log(response.data)
    let longitude = Number(response.data.places[0].longitude)
    let latitude = Number(response.data.places[0].latitude)
    console.log('this is latitude', latitude)
    sitterObject.location.postal = Number(response.data['post code'])
    sitterObject.location.country = response.data.country
    sitterObject.location.city = response.data.places[0]['place name']
    sitterObject.location.state = response.data.places[0].state
    sitterObject.location.longitude = longitude
    sitterObject.location.latitude = latitude
    console.log(' I want to see thiiiiis', sitterObject)
  }).catch(function (error) {
    console.error('this is thiiiis wrr', error);
  });


    sitterObject.owner = name;
    sitterObject.email = email;
    sitterObject.phoneNumber = number;
    sitterObject.petSitter = petSitter;

    console.log('this is', sitterObject)

    const formData = new FormData();
    await formData.append('file', ppFile);
    await formData.append('upload_preset', 'o9exuyqa');
    await axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
      .then((res) => {
        sitterObject.profilePicture = res.data.secure_url;
      })
      .catch((err) => console.log(err));
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (credential) => {
      sitterObject._id = credential.user.uid
      let petsArrayCopy = petsArray.slice()
      for (let i = 0; i < petsArray.length; i++) {
        if (petsArray[i].petPicFiles.length > 0) {
          let arr = []
          await Promise.all(
            petsArray[i].petPicFiles.map((eachFile)=> {
              const formData = new FormData();
              formData.append('file', eachFile);
              formData.append('upload_preset', 'o9exuyqa');
              // console.log(imageFiles)
              return axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
                .then((res) => {
                  arr.push(res.data.secure_url);
                })
                .catch((err) => console.log(err));
              })
          ).then(() => {
            petsArrayCopy[i].petPicFiles = arr
          })
          if (i === petsArray.length-1) {
            sitterObject.pets = petsArrayCopy;
            axios.post('/petsitter', sitterObject)
              .then((data) => {console.log('successful'); setWarning(false); setTrigger(!trigger); setCreateNew(false)})
              .catch((err) => {console.log('This is post', err)})
          }
        } else {
          if (i === petsArray.length-1) {
            sitterObject.pets = petsArrayCopy;
            axios.post('/petsitter', sitterObject)
              .then((data) => {console.log('successful'); setWarning(false); setTrigger(!trigger); setCreateNew(false)})
              .catch((err) => {console.log('This is post', err)})
          }
          continue
          }
        }
        if (petsArray.length === 0) {
          sitterObject.pets = petsArrayCopy;
          axios.post('/petsitter', sitterObject)
            .then((data) => {console.log('successful'); setWarning(false); setTrigger(!trigger); setCreateNew(false)})
            .catch((err) => {console.log('This is post', err)})
        }
    })
    .catch((err) => {console.log(err)})

  }

  const submitProfilePhoto = (e) => {
    // handleClick()
    setPPfile(e.target.files[0])
    const photo = URL.createObjectURL(e.target.files[0]);
    setProfilePhoto(photo)
    setPPDis('none')
  };


  return (
    <div className = 'sign-up-container'>
      {spinnerDis && (
        <div className='spinnerBack'>
          <div class="spinner"></div>
        </div>
      )}
      <form onSubmit={signUp}>
        <h1>Create an Account</h1>
        <input type='email' placeholder='Enter you email' value={email} onChange={emailHandler}/>
        <input type='password' placeholder='Enter your password' value={password} onChange={passwordHandler}/>

        <br/>
        <br/>

        <label className='uploadPP'>Upload a profile picture
          <input type='file' className='upload-profilepic' onChange={submitProfilePhoto} style={{display:ppDis}}/>
          <br/>
          {profilePhoto !== '' && (
            <>
              <img src={profilePhoto} width='200' height='300'/>
              <button onClick={(e) => {setProfilePhoto(''); setPPDis(''); setPPfile('')}}>x</button>
            </>
          )}
        </label>

        <br/>
        <br/>

        <label>What is your name? <input type='text' value={name} onChange={(e) => setName(e.target.value)}/></label>
        <br/>
          <input type='number' value={zip} onChange={(e) => setZip(e.target.value)} placeholder='zipcode'/>
        <label>What is the best phone number to reach you? <input type='number' value={number} onChange={(e) => setNumber(e.target.value)}/></label>
        <br/>

        <label>How many pets do you have? <input type='number' min='0' value={petsNum} onChange={(e) => {setPetsNum(e.target.value); setPetsArray(Array(Number(e.target.value)).fill({}))}}/></label>
        {petsNum > 0 && (<Pets petsArray={petsArray} setPetsArray={setPetsArray}/>)}
        <br/>

        <label>Do you want to be a pet-sitter?
          <br/>
          <label>
           <input name='petsitter' type='radio' value={true} onChange={(e) => setPetSitter(e.target.value)}/> Of Course!
          </label>
          <br/>
          <label>
            <input name='petsitter' type='radio' value={false} onChange={(e) => setPetSitter(e.target.value)}/>{" I am not ready :'("}</label>
          </label>
          <br/>
        <button>Sign up</button>
        <div className='warning' style={{display:warning}} >Please make sure that name, phone number, and zipcode are filled</div>
        <button onClick={(e) => {setBack(!backStatus)}}>back</button>
      </form>
    </div>
  );
}

export default SignUp
