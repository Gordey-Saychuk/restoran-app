import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import { wishListHandler } from '../../../store/UserSlice';
import { Product } from '../../../types/common'; 
import LoadMore from '../../UI/LoadMore/LoadMore';
import CartItem from '../Cart/CartItem/CartItem';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  products: Product[];
}

const PRODUCT_LIST_LIMIT = 12;

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { url } = useParams();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const [productsToRender, setProductsToRender] = useState<Product[]>([]);
  const [count, setCount] = useState(PRODUCT_LIST_LIMIT);
  const isLoadMoreVisible = products.length > count;
  const [sortInDescendingOrder, setSortInDescendingOrder] = useState(false);
  const [sorted, setSorted] = useState<Product[]>([]);

  const sortedProducts = products.sort((a, b) => {
    let x = a.discount?.discountedPrice ?? a.price;
    let y = b.discount?.discountedPrice ?? b.price;

    if (sortInDescendingOrder) {
      return y - x;
    }
    return x - y;
  });

  const sort = () => {
    setSorted(sortedProducts);
  };

  useEffect(() => {
    if (sorted.length > 0) {
      setProductsToRender(sortedProducts.slice(0, count));
    }
  }, [sorted, sortedProducts, sortInDescendingOrder, count]);

  useEffect(() => {
    setProductsToRender(sortedProducts.slice(0, PRODUCT_LIST_LIMIT));
    setCount(PRODUCT_LIST_LIMIT);
  }, [sortedProducts]);

  useEffect(() => {
    setSortInDescendingOrder(false);
  }, [url]);

  const handleWishlist = (id: Product['id']) => {
    const isWished = wishlist.includes(id);
    dispatch(wishListHandler({ id, isWished }));
  };

  const showMoreHandler = (count: number) => {
    setCount(count);
    const list = sortedProducts.slice(0, count);
    setProductsToRender(list);
  };

  useEffect(() => { 
    setProductsToRender(sortedProducts.slice(0, PRODUCT_LIST_LIMIT));
  }, [sortedProducts]);

  const toggleSorting = () => {
    setSortInDescendingOrder((prev) => !prev);
    sort();
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
              price={product.discount?.discountedPrice ?? product.price}
              image={product.image}
              categoryUrl={product.category.url}
              description={product.description}
              totalPrice={product.discount?.discountedPrice ?? product.price}
              weight={0}
              totalWeight={0}
          
        
     
            />
          ))}
        </ul>
      </div>
      {/* {isLoadMoreVisible && (
        <LoadMore
          count={count}
          itemsListLength={products.length}
          onClick={showMoreHandler}
          itemsLimit={PRODUCT_LIST_LIMIT}
        />
      )} */}
    </div>
  );
};

export default ProductCardList;



// src/components/ProductCardList/ProductCardList.tsx

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDishes } from '../../../store/dishActions';
// import { RootState } from '../../../store/store';
// import CartItem from '../Cart/CartItem/CartItem';
// import classes from './ProductCardList.module.css';

// interface IProductCardListProps {
//   restaurantId: number;
//   categoryId?: number;
//   dishId?: number;
//   products: Product[]; // Add this line to define products prop
// }


// const ProductCardList: React.FC<IProductCardListProps> = ({ restaurantId, categoryId, dishId }) => {
//   const dispatch = useDispatch();
//   const { dishes, isLoading, error } = useSelector((state: RootState) => state.dishes);

//   useEffect(() => {
//     dispatch(fetchDishes({ restaurantId, categoryId, dishId }));
//   }, [dispatch, restaurantId, categoryId, dishId]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error.isError) {
//     return <div>{error.message}</div>;
//   }

//   return (
//     <div className={classes['product-card-list']}>
//       <div className={classes.tovarConteiner}>
//         <ul className={classes.list}>
//           {dishes.map((dish) => (
//             <CartItem
//               key={dish.id}
//               productId={dish.id}
//               name={dish.name}
//               price={dish.price}
//               image={dish.photo}
//               categoryUrl={`/category/${dish.category_id}`}
//               totalPrice={dish.price}
//               weight={0}
//               totalWeight={0}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProductCardList;
