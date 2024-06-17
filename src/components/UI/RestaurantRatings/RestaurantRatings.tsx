import React from 'react';
import classes from './RestaurantRatings.module.css';

interface RestaurantNameProps {
  rating: number;
}

const RestaurantRatings: React.FC<RestaurantNameProps> = ({ rating }) => {
  return (
    <div className={classes.reitingRestoranDiv}>
    <div className={classes.reitingRestoran}>{rating}</div>
 
    </div>
  );
};

export default RestaurantRatings;
