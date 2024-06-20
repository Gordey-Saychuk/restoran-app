// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../../../constants/messages';
// import { AppDispatch, RootState } from '../../../../store/store';
// import { wishListHandler } from '../../../../store/UserSlice';
// import { CartItem, Product } from '../../../../types/common';
// import Section from '../../../layouts/showcaseLayouts/Section/Section';
// import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
// import AddToCartBtn from '../../../showcase/AddToCartBtn/AddToCartBtn';
// import Chip from '../../../UI/Chip/Chip';
// import IconButton from '../../../UI/IconButton/IconButton';
// import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
// import NotFound from '../NotFound/NotFound';
// import InfoBlock from './InfoBlock/InfoBlock'; 
// import classes from './ProductPage.module.css';
// import ShowcaseHeader from '../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader';
// import CartItemComponent from '../../../showcase/Cart/CartItem/CartItem';  
// import Back from '../../../UI/Back/Back';

// interface IProductPageProps {}

// interface ICartItemProps extends CartItem {
//   isWished?: boolean;
//   onWishlist?: () => void;

//   image: string; // Make sure image is required
//   categoryUrl?: string;
// }


// const ProductPage: React.FC<IProductPageProps> = () => {
//   const { id: productId } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { products } = useSelector((state: RootState) => state.product);
//   const { wishlist } = useSelector((state: RootState) => state.user);
//   const product = products.find((product) => product.id === productId) as Product;

//   if (!product) {
//     return <NotFound />;
//   }

//   const { id, name, description, image, brand, price, weight, discount, gender, category } = product;
//   const chipText =
//     gender.url === 'male' ? 'Мужская коллекция' : gender.url === 'female' ? 'Женская коллекция' : 'Унисекс';
//   const isWished = wishlist.includes(id);

//   const finalPrice = discount?.discountedPrice ?? price;

//   const cartItem: ICartItemProps = {
//     productId: id,
//     name,
//     quantity: 1,
//     price: finalPrice,
//     totalPrice: finalPrice,
//     weight,
//     totalWeight: weight,
   
//     discountedPrice: discount?.discountedPrice,
//     discount: discount?.percent,
//     image: image || '', 
//     categoryUrl: category.url,
//     isWished,
//     onWishlist: () => dispatch(wishListHandler({ id, isWished })),

//   };
  
//   return (
//     <Section>
//       <SectionBody><>
//       <ShowcaseHeader />
     
        
//         <div className={classes['product-page']}>
        
          

//               <div className={classes.cart}>
//               <CartItemComponent {...cartItem} />
//               </div>

          
        
//           <div className={classes['content-wrapper']}>
//             <div className={classes['title-wrapper']}>
//               <h1 className={classes.title}>{name}</h1>
//               <div className={classes['chip-wrapper']}>
//                 <Chip text={brand.name} mode={'plain'} />
//                 <Chip text={chipText} mode={'plain'} />
//               </div>
//             </div>

//             <div className={classes['price-wrapper']}>
//               {discount ? (
//                 <span className={`${classes.price}`}>
//                   <span className={classes.price}>{discount.discountedPrice} ₽</span>
//                   <span className={classes['old-price']}>{price} ₽</span>
//                   <Chip text={'-' + discount.percent + '%'} mode={'attention'} />
//                 </span>
//               ) : (
//                 <span className={classes.price}>{price} ₽</span>
//               )}

//               <IconButton onClick={() => dispatch(wishListHandler({ id, isWished }))} column>
//                 <>
//                   <FavoriteIcon filled={isWished} />
//                   <span className={classes['wishlist-text']}>
//                     {isWished ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
//                   </span>
//                 </>
//               </IconButton>
//             </div>

//             <div className={classes.actions}>
//               <AddToCartBtn product={cartItem} />
//             </div>

//             {description && (
//               <div className={classes.description}>
//                 <p className={classes.subtitle}>О товаре</p>
//                 <p className={classes.text}>{description}</p>
//               </div>
//             )}

//             <InfoBlock />
//           </div>
//         </div>
//         </>
//       </SectionBody>
//     </Section>
//   );
// };

// export default ProductPage;










import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../store/store';
import { fetchProductDetails } from '../../../../store/productDetailsSlice';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import classes from './ProductPage.module.css';
import NotFound from '../NotFound/NotFound';
import CartItemComponent from '../../../showcase/Cart/CartItem/CartItem';
import Back from '../../../UI/Back/Back';
import Button from '../../../UI/Button/Button';
import AddToCartBtn from '../../../showcase/AddToCartBtn/AddToCartBtn';
import { addToCart } from '../../../../store/cartSlice';
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox';

interface IProductPageProps {}

const ProductPage: React.FC<IProductPageProps> = () => {
  const { id: dishId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { details, isLoading, error } = useSelector((state: RootState) => state.productDetails);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (dishId) {
      dispatch(fetchProductDetails(Number(dishId)));
    }
  }, [dispatch, dishId]);

  useEffect(() => {
    if (details && details.extra) {
      const initialExtras = Object.keys(details.extra).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      setSelectedExtras(initialExtras);
    }
  }, [details]);

  const handleExtraChange = (key: string) => {
    setSelectedExtras((prevSelectedExtras) => ({
      ...prevSelectedExtras,
      [key]: !prevSelectedExtras[key],
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = details?.price || 0;
    Object.entries(selectedExtras).forEach(([key, isSelected]) => {
      if (isSelected && details?.extra[key]) {
        totalPrice += details.extra[key][1];
      }
    });
    return totalPrice * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: details?.id.toString() || '',
      name: details?.name || '',
      price: calculateTotalPrice(),
      quantity,
      image: details?.photo ? `http://94.124.78.52:8017/images/${details.photo}` : 'https://cdn.icon-icons.com/icons2/4135/PNG/512/plate_dish_food_dinnerware_icon_260731.png',
      categoryUrl: details?.category_name || '',
      totalPrice: calculateTotalPrice(),
      weight: 0,
      totalWeight: 0,
      isWished: false,
    };

    dispatch(addToCart(cartItem));
  };

  if (isLoading) {
    return <Placeholder text="Loading product details..." size="38px" />;
  }

  if (error) {
    return <Placeholder text={error} size="38px" />;
  }

  if (!details) {
    return <NotFound />;
  }

  const { id, name, description, photo, price, category_name, extra } = details;
  const imageUrl = photo ? `http://94.124.78.52:8017/images/${photo}` : 'https://cdn.icon-icons.com/icons2/4135/PNG/512/plate_dish_food_dinnerware_icon_260731.png';

  return (
    <Section >
      <>
        <div className={classes.backWrapper}>
          <Back />
        </div>
        <div className={classes['product-page']}>
          <div className={classes.cart}>
          <CartItemComponent
  productId={id.toString()}
  name={name}
  price={price}
  image={imageUrl}
 
  categoryUrl={category_name}
  quantity={quantity}
  isProductPage={true}
  borderRadius="15px"
/>

          </div>
          <div className={classes['content-wrapper']}>
            <div className={classes['description-wrapper']}>
              <p className={classes.desTitle}>Описание продукта</p>
              <p className={classes.desc}>{description}</p>
            </div>
            {/* <AddToCartBtn
              product={{
                productId: id.toString(),
                name,
                price: calculateTotalPrice(),
                quantity,
              }}
              onClick={handleAddToCart}
            /> */}
          </div>

          <div className={classes['content-wrappers']}>
            <div className={classes['description-wrapper']}>
              <p className={classes.desTitle}>Дополнительные товары</p>
              <ul className={classes.list}>
                {extra &&
                  Object.entries(extra).map(([key, [extraName, extraPrice]]) => (
                    <li className={classes.descs} key={key}>
                      <div className={classes.descsc}> {extraName}: <div>{extraPrice} ₽</div></div>
                     
                      <CustomCheckbox
                        checked={selectedExtras[key]}
                        onChange={() => handleExtraChange(key)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.ButtonWrapper}>
        <Button
            def="main"
            mode="primary"
            onClick={handleAddToCart}
            product={{
              productId: id.toString(),
              name,
              price: calculateTotalPrice(),
              quantity,
            }}
          >
            Добавить в корзину
          </Button>
      </div>

      </>
    </Section>
  );
};

export default ProductPage;
