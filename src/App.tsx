import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Cropper from './image-croper';
import getCroppedImg from './image-croper/cropImage';

function App() {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({})
  const [croppedImage, setCroppedImage] = useState('')

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const selectedImage =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      ) 
      console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <div className="App">
      
      <div className="cropContainer-1">
        <Cropper
          image={selectedImage}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="cropContainer-3">
     
     {croppedImage ?
     <img src={croppedImage ?croppedImage:''}/>
     : null
    }
      
      </div>


      <div className="cropContainer-2">
         <button
          onClick={showCroppedImage}
        >
          Show Result
        </button>
        
      </div>
     
    </div>
  );
}

export default App;
