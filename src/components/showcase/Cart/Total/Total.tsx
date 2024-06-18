import React from "react";
import style from "./total.module.css";



interface TotalProps {
    number?: number;
  }

const Total : React.FC<TotalProps> = ({ number }) => {
  return (
    <div className={style.Total}>
      <div>Total:</div>
      <div className={style.number}>${number}</div>
    </div>
  );
};

export default Total;
