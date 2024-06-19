import React from "react";
import style from "./LanguageList.module.css";
import Germany from "../../../../../assets/svg/country/germany.svg";
import Russia from "../../../../../assets/svg/country/russia.svg";
import Usa from "../../../../../assets/svg/country/usa.svg";

const LanguageList = () => {
  return (
    <div className={style.LanguageList}>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={Germany} alt="" />
        </div>
        <div className="name">Germany</div>
      </div>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={Russia} alt="" />
        </div>
        <div className="name">Russia</div>
      </div>
      <div className={style.LanguageItem}>
        <div className="img">
          <img src={Usa} alt="" />
        </div>
        <div className="name">English</div>
      </div>
    </div>
  );
};

export default LanguageList;
