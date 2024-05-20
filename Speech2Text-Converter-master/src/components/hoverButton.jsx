import React, { useState } from "react";
import '../styles/hoverButton.css'
import { language } from '../assets/images';
import LangMenu from "./languageLink";
import { languages } from "../languages/language";

const HoverButton = ({setCurrentLanguage}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <div className="dropdown" onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <button className="hoverButton"><img src={language} alt="language" /></button>
        {isHovered && (
                <LangMenu langItem={languages} setCurrentLanguage={setCurrentLanguage} />
    )
    }
    </div>
    );
};

export default HoverButton;
