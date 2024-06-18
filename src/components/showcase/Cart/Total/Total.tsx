import React from "react";
import style from "./total.module.css";
import { CartItem } from '../../../../types/common';


interface TotalProps {
 
    price: CartItem['totalPrice'];

  }

const Total : React.FC<TotalProps> = ({price }) => {
  return (
    <div className={style.Total}>
      <div>Total:</div>
      <div className={style.number}>${price}</div>
    </div>
  );
};

export default Total;
