import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Checkbox.module.css';

interface ICheckboxProps {
  onCheck: () => void; 
  label: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({ onCheck, label }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      setIsChecked(false);
    }
  }, [url]);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
    onCheck();
  };

  return (
    <div className={classes.container}>
      <button
        className={`${classes.button} ${isChecked ? classes.checked : ''}`}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Checkbox;
