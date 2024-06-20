import React from 'react';
import classes from './QuantityBlock.module.css';

interface IQuantityBlockProps {
  id?: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityBlock: React.FC<IQuantityBlockProps> = ({ id, quantity, setQuantity }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={classes['quantity-block']}>
      <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityBlock;
