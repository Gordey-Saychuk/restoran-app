// src/components/showcase/Filter/Filter.tsx

import React from 'react';
import Checkbox from '../../UI/Checkbox/Checkbox';
import classes from './Filter.module.css';

interface IFilterProps {
  checkboxItems: { id: number, name: string }[];
  onCheck: (id: number) => void;
}

const Filter: React.FC<IFilterProps> = ({ checkboxItems, onCheck }) => {
  return (
    <div className={classes.filter}>
      <div className={classes.slider}>
        {checkboxItems.map((item) => (
          <Checkbox key={item.id} label={item.name} onCheck={() => onCheck(item.id)} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
