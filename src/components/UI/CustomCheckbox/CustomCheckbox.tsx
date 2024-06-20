import React from 'react';
import classes from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className={`${classes.checkbox} ${checked ? classes.checked : ''}`} onClick={onChange}>
      {checked && <img src="https://papik.pro/uploads/posts/2022-01/1641264765_61-papik-pro-p-galochka-vektornii-risunok-64.png" alt="Checked" className={classes.checkmark} />}
    </div>
  );
};

export default CustomCheckbox;
