import React, { useState, useEffect } from 'react';
import { Dish } from '../../../store/discountedProductsSlice'; 
import CartItem from '../Cart/CartItem/CartItem';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  dishes: Dish[];
}

const PRODUCT_LIST_LIMIT = 12;
const DEFAULT_IMAGE_URL = 'https://cdn.icon-icons.com/icons2/4135/PNG/512/plate_dish_food_dinnerware_icon_260731.png';

const ProductCardList: React.FC<IProductCardListProps> = ({ dishes }) => {
  const [productsToRender, setProductsToRender] = useState<Dish[]>([]);
  const [count, setCount] = useState(PRODUCT_LIST_LIMIT);
  const isLoadMoreVisible = dishes.length > count;

  useEffect(() => {
    setProductsToRender(dishes.slice(0, count));
  }, [dishes, count]);

  const showMoreHandler = () => {
    setCount(count + PRODUCT_LIST_LIMIT);
  };

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
            
              image={ DEFAULT_IMAGE_URL} 
              description={product.description}
              categoryUrl={`category-${product.category_id}`} 
            />
          ))}
        </ul>
      </div>
      {isLoadMoreVisible && (
        <button onClick={showMoreHandler}>Load More</button>
      )}
    </div>
  );
};

export default ProductCardList;
