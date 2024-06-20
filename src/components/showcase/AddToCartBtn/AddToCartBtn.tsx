import React from 'react';
import classes from './AddToCartBtn.module.css';

interface IProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface IAddToCartBtnProps {
  product: IProduct;
  onClick: () => void;
}

const AddToCartBtn: React.FC<IAddToCartBtnProps> = ({ product, onClick }) => {
  const { name, quantity } = product;

  return (
    <button className={classes['add-to-cart-btn']} onClick={onClick}>
      Add {quantity} of {name} to cart
    </button>
  );
};

export default AddToCartBtn;
