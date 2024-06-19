import React from "react";
import style from "./LanguageStyle.module.css";
import TopBar from "../../../UI/TopBar/TopBar";
import Back from "../../../UI/Back/Back";
import Title from "../../../UI/Title/Title";
import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
import LanguageList from "./LanguageList/LanguageList";

const LanguagePage = () => {
  return (
    <>
      <div className={style.Container}>
        <TopBar />
        <Back />
        <Title>Выбор языка:</Title>
        <SectionBody>
            <>
                <LanguageList />
            </>
        </SectionBody>
      </div>
    </>
  );
};

export default LanguagePage;
