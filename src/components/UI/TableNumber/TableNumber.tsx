import React, { useState, useRef, useEffect } from "react";
import style from "./table.module.css";
import ReactDOM from "react-dom";

interface TableNumberProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTable: number;
  setSelectedTable: React.Dispatch<React.SetStateAction<number>>;
}

const TableNumber: React.FC<TableNumberProps> = ({
  showDropdown,
  setShowDropdown,
  selectedTable,
  setSelectedTable,
}) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTableSelect = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownMenu = (
    <ul
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: buttonRef.current
          ? buttonRef.current.getBoundingClientRect().bottom + window.scrollY
          : 0,
        right: "20px",
        backgroundColor: "white",
        border: "1px solid rgb(68, 75, 81)",
        borderTop : "none",
        listStyleType: "none",
        borderBottomLeftRadius : "8px",
        borderBottomRightRadius : "8px",
        padding: "0",
        margin: "0",
        width: "175px",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {tables.map((table) => (
        <li
          key={table}
          onClick={() => handleTableSelect(table)}
          style={{
            padding: "8px",
            cursor: "pointer",
            borderBottom: table !== tables.length ? "1px solid #ccc" : "none",
            backgroundColor: table === selectedTable ? "#f0f0f0" : "white",
          }}
        >
          Столик №{table}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.dropDown}>
      <div
        ref={buttonRef}
        onClick={handleDropdownToggle}
        className={style.dropDownButton}
      >
        {selectedTable ? `Столик №${selectedTable}` : "Выбрать столик"}{" "}
        <span
          className={style.dropDownArrow}
          style={{
            transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 7L7 1"
              stroke="#FF5656"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      {showDropdown && ReactDOM.createPortal(dropdownMenu, document.body)}
    </div>
  );
};

export default TableNumber;
