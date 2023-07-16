import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Nav from './components/navbar/Nav'
import Icon from './components/icon/Icon'
import Rank from './components/rank/Rank'
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm"
import ImgBox from './components/imagebox/ImgBox'
import ParticlesBg from 'particles-bg'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'

function App() {
  const [urlInput, setUrlInput] = useState("https://samples.clarifai.com/metro-north.jpg");
  const [box, setBox] = useState({});
  const [user, setUser] = useState({id:'',name:'', email:'',entries:0, joined:''})
    useEffect(() => {
      fetch('https://mybackendface.onrender.com/').then(response => response.json())
      .then(data => {console.log(data)})
    }, [])

  const handleInputUrl = (event) => {
    const e = (event.target.value);
    setUrlInput(e)
    setBox('')
  };

  const CalculateTheFace = (data) => {
    const ResultClarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imagebox');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ResultClarifai.left_col * width,
      topRow: ResultClarifai.top_row * height,
      rightCol: width - (ResultClarifai.right_col * width),
      bottomRow: height - (ResultClarifai.bottom_row * height)
    }
  }

  const BoxShape = (boxInfo) => {
    console.log(boxInfo)
    setBox(boxInfo);
  }

  const onButtonClick = () => {
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        BoxShape(CalculateTheFace(result))
        fetch('https://mybackendface.onrender.com/image' , {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data) {
            setUser(prevUser => ({
              ...prevUser,
              entries: data
            }));
          }
        })
        .catch(error => console.log('error', error));
    })
      .catch(error => console.log('error', error));
    console.log('clicked');
  };

  // const app = new Clarifai.App({
  //   apiKey: '5b0b24c04e8444ca86f2164d5fab98cb'
  //  });
  const PAT = 'e9fd61e3328a4b8698041783a9817ae7';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'modr';
  const APP_ID = 'my-first-application';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
  // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": urlInput
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id
const loadUser = (user) => {
  setUser({
    id:user.id, name:user.name, email: user.email, entries:user.entries, joined:user.joined
  })
  console.log(user);
}
const setImageEmpty = () => {
  setUrlInput('')
}

  return (
    <>
      <BrowserRouter>
      <Nav setImageEmpty={setImageEmpty}/>
        <Routes>
          
          <Route path='/home' element={
            <div className="App">
            
            <Icon />
            <Rank entries={user.entries} userName={user.name}/>
            <ImageLinkForm handleInputUrl={handleInputUrl} onButtonClick={onButtonClick} />
            <ImgBox Image={urlInput} box={box} />
          </div>
          }>
          </Route>
          <Route path='/' element={<SignIn loadUser={loadUser}/>}></Route>
          <Route path='/register' element={<Register loadUser={loadUser}/>}></Route>
        </Routes>
        <ParticlesBg num={100} type="cobweb" bg={true} />
      </BrowserRouter>     
    </>
  );
}

export default App;
