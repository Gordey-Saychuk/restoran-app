import React from 'react';
import classes from './RestaurantName.module.css';

interface RestaurantNameProps {
  name: string;
}

const RestaurantName: React.FC<RestaurantNameProps> = ({ name }) => {
  return (
      <div className={classes.headerRestoran}>{name}</div>
 
  );
};

export default RestaurantName;
