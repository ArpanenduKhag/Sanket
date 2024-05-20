import React from "react";
import '../styles/TextContainer.css';
import { cancelGif, cancelPng, uploadButton, successPng } from '../assets/images';

const TextContainer = ({changeCancelButton, setchangeCancelButton,setcancelState,cancelState,setExtension,setFile,uploadedImage,setUploadedImage,generatedText }) => {
    

    const inputDisplay = {
        display:'none'
    }

    const buttonClickEvent = () => {
        let inputID = document.getElementById('inputButton');
        inputID.click();
    }

    const handleCancelButton = () => {
        if (cancelState) {
            setFile('');
            setchangeCancelButton(cancelGif)
            setTimeout(() => {
                setchangeCancelButton(successPng)
            }, 500);
            setcancelState(false);
            setUploadedImage(uploadButton);
        }
    }

    const getFileExtension = (filename) => {
        const ext = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
        if (ext === 'jpg') {
            setExtension('jpeg')
        }
        else {
            setExtension(ext);   
        }
    };

    const handleUploadedImage = (e) => {
        const selectedFile = e.target.files[0];
        setUploadedImage(URL.createObjectURL(selectedFile));
        setcancelState(true);
        setchangeCancelButton(cancelPng);
        getFileExtension(selectedFile.name);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setFile(base64Data);
            };
            reader.readAsDataURL(selectedFile);
        }

    }

    return (
        <div className="translator">
            <div className="imageSection">
                <input type="file" onChange={handleUploadedImage} accept="image/png, image/jpeg, image/webp, image/heic, image/heif" name="image" id="inputButton" style={inputDisplay} />
                <div className="outerImageDiv">
                    <img tabIndex="0" role="button" className="uploadedimage" onClick={buttonClickEvent} src={uploadedImage} alt="uploadImage" />
                </div>
                <div className="cancelButton">
                    <img className="cancel" onClick={handleCancelButton} src={changeCancelButton} alt="cancel" />
                </div>
            </div>
            <div className="result">{generatedText}</div>
        </div>

    )
};

export default TextContainer;