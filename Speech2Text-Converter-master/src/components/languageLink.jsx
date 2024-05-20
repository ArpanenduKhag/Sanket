import React from "react";

const LangLink = ({ lang, setCurrentLanguage }) => {

  const handleClick = () => {
    setCurrentLanguage(lang);
  };

  return (
    <div onClick={handleClick} className="language">
      {lang}
    </div>
  );
};

const LangMenu = ({ langItem,setCurrentLanguage }) => {

  const listItems = langItem.map((lang) => {
    return <LangLink key={lang} lang={lang} setCurrentLanguage={setCurrentLanguage} />;
  });

  return <div className="contentBox">{listItems}</div>;
};

export default LangMenu;
