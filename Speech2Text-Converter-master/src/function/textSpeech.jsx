    const handleTranslateVoice = async (editedTranscript,language,setAudioSrc) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/text/?txt=${editedTranscript}&lang=${language}`);
            const blob = await response.blob();
            setAudioSrc(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

const handleTranslateText = async (editedTranscript) => {
    let text = '';
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/translate/?txt=${editedTranscript}`);
            const data = await response.json();
            text = data.translate;
        }catch(error){
            console.error('Error fetching data: ', error);
            text = 'purchase the product';
    }
    return text;
    };

    export {handleTranslateText, handleTranslateVoice};