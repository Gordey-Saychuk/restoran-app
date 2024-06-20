// src/components/UI/SkeletonProductCard/SkeletonProductCard.tsx
import React from 'react';
import classes from './SkeletonProductCard.module.css';

const SkeletonProductCard: React.FC = () => {
  return (
    <div className={classes.skeletonCard}>
      <div className={classes.image}></div>
      <div className={classes.textConteiner}>
      <div className={classes.texts}></div>
      <div className={classes.text}></div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
