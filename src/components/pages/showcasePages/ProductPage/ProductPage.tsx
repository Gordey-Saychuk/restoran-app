import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../../../constants/messages';
import { AppDispatch, RootState } from '../../../../store/store';
import { wishListHandler } from '../../../../store/UserSlice';
import { CartItem, Product } from '../../../../types/common';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import AddToCartBtn from '../../../showcase/AddToCartBtn/AddToCartBtn';
import Chip from '../../../UI/Chip/Chip';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import NotFound from '../NotFound/NotFound';
import InfoBlock from './InfoBlock/InfoBlock'; 
import classes from './ProductPage.module.css';
import ShowcaseHeader from '../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader';
import CartItemComponent from '../../../showcase/Cart/CartItem/CartItem';  
import Back from '../../../UI/Back/Back';

interface IProductPageProps {}

interface ICartItemProps extends CartItem {
  isWished?: boolean;
  onWishlist?: () => void;

  image: string; // Make sure image is required
  categoryUrl?: string;
}


const ProductPage: React.FC<IProductPageProps> = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const product = products.find((product) => product.id === productId) as Product;

  if (!product) {
    return <NotFound />;
  }

  const { id, name, description, image, brand, price, weight, discount, gender, category } = product;
  const chipText =
    gender.url === 'male' ? 'Мужская коллекция' : gender.url === 'female' ? 'Женская коллекция' : 'Унисекс';
  const isWished = wishlist.includes(id);

  const finalPrice = discount?.discountedPrice ?? price;

  const cartItem: ICartItemProps = {
    productId: id,
    name,
    quantity: 1,
    price: finalPrice,
    totalPrice: finalPrice,
    weight,
    totalWeight: weight,
    discountedPrice: discount?.discountedPrice,
    discount: discount?.percent,
    image: image || '', 
    categoryUrl: category.url,
    isWished,
    onWishlist: () => dispatch(wishListHandler({ id, isWished })),

  };
  
  return (
    <Section>
      <SectionBody>
        <div className={classes['product-page']}>
          <div className={classes['image-wrapper']}>
            <ShowcaseHeader />

            <ul className={classes.list}>
              <CartItemComponent {...cartItem} />
            </ul>

            <img src={image} alt={name} className={classes.image} />
          </div>
          <div className={classes['content-wrapper']}>
            <div className={classes['title-wrapper']}>
              <h1 className={classes.title}>{name}</h1>
              <div className={classes['chip-wrapper']}>
                <Chip text={brand.name} mode={'plain'} />
                <Chip text={chipText} mode={'plain'} />
              </div>
            </div>

            <div className={classes['price-wrapper']}>
              {discount ? (
                <span className={`${classes.price}`}>
                  <span className={classes.price}>{discount.discountedPrice} ₽</span>
                  <span className={classes['old-price']}>{price} ₽</span>
                  <Chip text={'-' + discount.percent + '%'} mode={'attention'} />
                </span>
              ) : (
                <span className={classes.price}>{price} ₽</span>
              )}

              <IconButton onClick={() => dispatch(wishListHandler({ id, isWished }))} column>
                <>
                  <FavoriteIcon filled={isWished} />
                  <span className={classes['wishlist-text']}>
                    {isWished ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
                  </span>
                </>
              </IconButton>
            </div>

            <div className={classes.actions}>
              <AddToCartBtn product={cartItem} />
            </div>

            {description && (
              <div className={classes.description}>
                <p className={classes.subtitle}>О товаре</p>
                <p className={classes.text}>{description}</p>
              </div>
            )}

            <InfoBlock />
          </div>
        </div>
      </SectionBody>
    </Section>
  );
};

export default ProductPage;
