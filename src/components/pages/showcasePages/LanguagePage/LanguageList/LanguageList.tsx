import React from "react";
import style from "./LanguageList.module.css";
import DE from "../../../../../assets/svg/country/DE.svg";
import FR from "../../../../../assets/svg/country/FR.svg";
import GB from "../../../../../assets/svg/country/GB.svg";
import IT from "../../../../../assets/svg/country/IT.svg";


const LanguageList = () => {
  return (
    <div className={style.LanguageList}>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={DE} alt="" />
        </div>
        <div className="name">Germany</div>
      </div>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={FR} alt="" />
        </div>
        <div className="name">Russia</div>
      </div>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={GB} alt="" />
        </div>
        <div className="name">English</div>
      </div>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={IT} alt="" />
        </div>
        <div className="name">English</div>
      </div>
    </div>
  );
};

export default LanguageList;
