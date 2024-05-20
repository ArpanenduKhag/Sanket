import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import '../styles/cameraBox.css'
import { cancelPng,swapPng} from "../assets/images";

const CameraBox = ({setchangeCancelButton,setFile,setcancelState,setCameraState,setUploadedImage }) => {

    const [imgSrc, setImgSrc] = useState(null);
    const [mode, setMode] = useState('environment');
    const webCamRef = useRef(null);

    const videoConstraints = {
        width: 250,
        height: 250,
        facingMode: mode
    };

    const capture = useCallback(
        () => {
            setImgSrc(webCamRef.current.getScreenshot());
            setcancelState(true);
        },[setcancelState]
    )

    
    const handleCameraState = () => {
        setCameraState(false);
        setchangeCancelButton(cancelPng)
        if (imgSrc) {
            setUploadedImage(imgSrc);   
            if (imgSrc) {
                const image = new Image();
                image.src = imgSrc;

                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0);
                    const base64Encoded = canvas.toDataURL("image/jpeg").split(',')[1];
                    setFile(base64Encoded);
                }
            }
        }
    }

    const handleMode = () => {
        if (mode === 'user') {
            setMode('environment');
        }
        else {
            setMode('user');
        }
    }

    const handleRetake = () => {
        setImgSrc(null);
    }

    return (
        <div className="cameraBox">
            <div className="upperBar">
                <img className="cancel" src={cancelPng}  onClick={handleCameraState} alt="cancel" />
            </div>
            <div className="downBar">
                {
                    imgSrc ? (
                        <img className="capturedImage" src={imgSrc} alt="capturedImage" />
                    ) : (
                        <Webcam
                            audio={false}
                            height={250}
                            ref={webCamRef}
                            screenshotFormat="image/jpeg"
                            width={250}
                            videoConstraints={videoConstraints}
                        />
                    )
                }
                <div className="swapBar">
                    <img className="swap" onClick={handleMode} src={swapPng} alt="swap" />
                </div>
                <div className="operationalButtons">
                    <button className="operation" onClick={capture}>capture</button>
                    <button className="operation" onClick={handleRetake}>retake</button>
                </div>
            </div>
        </div>
    )
}

export default CameraBox;