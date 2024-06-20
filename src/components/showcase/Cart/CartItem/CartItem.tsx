import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Dish, ProductCartItem } from '../../../../types/common';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import TrashIcon from '../../../UI/icons/TrashIcon/TrashIcon';
import QuantityBlock from '../../../UI/QuantityBlocks/QuantityBlock'; // Ensure correct import
import classes from './CartItem.module.css';
import { on } from 'events';

interface ICartItemProps {
  productId?: Dish['id'];
  name?: Dish['name'];
  image: ProductCartItem['image'];
  price: Dish['price'];
  quantity?: ProductCartItem['quantity'];
  totalPrice?: ProductCartItem['totalPrice'];
  weight?: ProductCartItem['weight'];
  totalWeight?: ProductCartItem['totalWeight'];
  profit?: ProductCartItem['profit'];
  discount?: ProductCartItem['discount'];
  discountedPrice?: ProductCartItem['discountedPrice'];
  categoryUrl?: Dish['category_id'];
  isWished?: ProductCartItem['isWished'];
  onWishlist?: () => void;
  onRemove?: (id : string) => void;
  description?: ProductCartItem['description']; 
  extra?: Record<string, [string, number]>; 
  isProductPage?: boolean; 
  borderRadius?: string; 
}

const CartItem: React.FC<ICartItemProps> = ({
  name,
  image,
  quantity,
  productId,
  totalPrice,
  discount,
  price,
  categoryUrl,
  description,
  isWished,
  onWishlist,
  onRemove,
  extra,
  isProductPage,
  borderRadius, 
}) => {
  const totalPriceWithoutDiscount = price * (quantity ?? 1);
  const truncatedDescription =
    description && description.length > 50
      ? `${description.slice(0, 50)}...`
      : description;

      console.log(name,image, quantity, productId, discount , price, categoryUrl)
  console.log(productId)
  return (
    <div className={classes['cart-item']} style={{ borderRadius }}>
      {onRemove && (
        <div className={classes['remove']}>
          <IconButton onClick={() => onRemove(productId)}>
            <TrashIcon />
          </IconButton>
        </div>
      )}
      <div
        className={classes.imageWrapper}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={image} alt={name} className={classes.image} />
      </div>
      <div className={classes['product-info']}>
        <div className={classes['product-name-wrapper']}>
          <Link
            to={generatePath(`/:categoryUrl/${productId}`, {
              categoryUrl,
              id: productId?.toString(),
            })}
            className={classes['product-name']}
          >
            {name}
            <div className={classes['product-desc-wrapper']}>
              {truncatedDescription}
            </div>
          </Link>
        </div>

        <div className={classes['price-quantity-wrapper']}>
          {isProductPage && quantity !== undefined && (
            <QuantityBlock id={productId} /> // Pass only the id prop
          )}
          <div className={classes['price-wrapper']}>
            <span
              className={`${classes.price} ${discount && classes['discount-price']}`}
            >
              <span className={classes['price']}>${price}</span>
            </span>
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default CartItem;
