import React from "react";
import style from "./table.module.css";

interface TableNumberProps {
  number?: number;
  onChange?: any;
}

const TableNumber: React.FC<TableNumberProps> = ({ number, onChange }) => {
  return (
    <div className={style.table}>
      <div className={style.tableNumberTitle}>Номер стола:</div>
      <div className={style.TableNumber}>
        <input type="number" value={number} onChange={onChange} />
      </div>
    </div>
  );
};

export default TableNumber;
