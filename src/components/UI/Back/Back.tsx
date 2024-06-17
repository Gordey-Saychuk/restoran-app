import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BackSvg from '../../../assets/svg/Back.svg'
import style from './back.module.css'

const Back = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="Back">
      <div className={style.Container}>
        <div onClick={() => handleGoBack()} className="Icon">
            <img src={BackSvg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Back;
