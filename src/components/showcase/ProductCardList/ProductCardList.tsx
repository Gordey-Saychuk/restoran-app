import React, { useEffect, useState } from 'react';
import { Dish } from '../../../store/discountedProductsSlice'; 
import CartItem from '../Cart/CartItem/CartItem';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  dishes: Dish[];
}

const DEFAULT_IMAGE_URL = 'https://cdn.icon-icons.com/icons2/4135/PNG/512/plate_dish_food_dinnerware_icon_260731.png';

const ProductCardList: React.FC<IProductCardListProps> = ({ dishes }) => {
  const [productsToRender, setProductsToRender] = useState<Dish[]>([]);

  useEffect(() => {
    setProductsToRender(dishes);
  }, [dishes]);

  return (
    <div className={classes['product-card-list']}>
      <div className={classes.tovarConteiner}>
        <ul className={classes.list}>
          {productsToRender.map((product) => (
            <CartItem
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              image={DEFAULT_IMAGE_URL}
              description={product.description}
              categoryUrl={`category-${product.category_id}`} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCardList;
