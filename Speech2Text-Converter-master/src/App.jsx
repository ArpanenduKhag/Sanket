import React, { useState } from "react";
import { uploadButton,successPng } from "./assets/images";

import './styles/App.css';

import SearchBox from "./components/searchBar";
import TextContainer from "./components/textContainer";
import CameraBox from "./components/cameraBox";

const App = () => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [generatedText, setGeneratedText] = useState('');
    const [cameraState, setCameraState] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(uploadButton);
    const [file, setFile] = useState('');
    const [extension, setExtension] = useState('jpeg');
    const [cancelState, setcancelState] = useState(false);    
    const [changeCancelButton, setchangeCancelButton] = useState(successPng);

    return (
        <div className="app">
            <div className="title">Speech2Text Converter</div>

            <div className="parag">This Project is for converting audio speech to text and passing it into our web service for processing.</div>
            
            <TextContainer setchangeCancelButton={setchangeCancelButton} changeCancelButton={changeCancelButton} setcancelState={setcancelState} cancelState={cancelState} setExtension={setExtension} setFile={setFile} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} generatedText={generatedText} />

            {
                cameraState ? (
                    <CameraBox setchangeCancelButton={setchangeCancelButton} setFile={setFile} setcancelState={setcancelState} setCameraState={ setCameraState} setUploadedImage={setUploadedImage} />
                ):null
            }
            <SearchBox  generatedText={generatedText} setAudioSrc={setAudioSrc} setCameraState={setCameraState} extension={extension} file={file} setGeneratedText={setGeneratedText}/>
            
            {audioSrc && (
                <div>
                    <audio controls>
                        <source src={audioSrc} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default App;
