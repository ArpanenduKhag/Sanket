import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { speechConvert } from "../languages/language";
import { sentBtn, sendBtn, recBtn, microphoneBtn, cameraPng } from "../assets/images";
import HoverButton from "./hoverButton";
import { handleTranslateText, handleTranslateVoice } from '../function/textSpeech';
import GenPro from "../function/genAIPro";
import GenVis from "../function/genAIVision";

import '../styles/searchBox.css';

const SearchBox = ({ generatedText, setAudioSrc, setCameraState, extension, file, setGeneratedText }) => {

    const [isSubmited, setSubmit] = useState(true);
    const [language, setCurrentLanguage] = useState('english');
    const [editedTranscript, setEditedTranscript] = useState('');

    const handleInputTextChange = (event) => {
        setEditedTranscript(event.target.value);
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setEditedTranscript(transcript);

    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="error">
                Browser does not support Speech Recognition
            </div>
        );
    }

    const handleStartListening = () => {
        setAudioSrc(null);
        SpeechRecognition.startListening({ continuous: true, language: speechConvert[language] });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleCameraState = () => {
        setCameraState(true);
    }

    const handleSubmit = async () => {
    setAudioSrc(null);
    setSubmit(false);
        let text = 'find the product';
        try {
            if (editedTranscript !== '') {
            await handleTranslateVoice(editedTranscript, language, setAudioSrc);
            text = await handleTranslateText(editedTranscript);
        }
        if (file === '') {
            await GenPro(text, setGeneratedText);
        } else {
            await GenVis(text,extension,file,setGeneratedText);
        }

        resetTranscript();
        setSubmit(true);
    } catch (err) {
        console.error(err);
        setSubmit(true); 
    }
};


    return (
        <div className="allInOne">
            <HoverButton setCurrentLanguage={setCurrentLanguage} />
            <div className="line">
                <div className="container">
                    <input type="text" name="text" id="text" value={editedTranscript} onChange={handleInputTextChange} />
                    <button className="inside" onClick={listening ? handleStopListening : handleStartListening}>
                        <img src={listening ? recBtn : microphoneBtn} alt="rec" />
                    </button>
                    <button className="inside" onClick={handleCameraState}>
                        <img src={cameraPng} alt="camera" />
                    </button>
                </div>
                <button className="outside" onClick={handleSubmit}>
                    <img src={isSubmited ? sentBtn : sendBtn} alt="send" />
                </button>
            </div>
        </div>
    );
}

export default SearchBox;
