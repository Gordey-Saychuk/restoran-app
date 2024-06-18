import { ProductCartItem } from "../../../types/common";
import Button from "../../UI/Button/Button";
// import Rate from '../../UI/Rate/Rate';
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import Total from "./Total/Total";
 
interface ICartProps {
  cart: ProductCartItem[];
  onWish: ({
    id,
    isWished,
  }: {
    id: ProductCartItem["productId"];
    isWished: boolean;
  }) => void;
  onRemove: (id: ProductCartItem["productId"]) => void;
  price: ProductCartItem["price"];
  weight: ProductCartItem["weight"];
  profit: ProductCartItem["profit"];
 
}

const Cart: React.FC<ICartProps> = ({
  cart,
  onRemove,
  onWish,
  price,
  weight,
  profit,
  
}) => {
  return (
    <div className={classes.cart}>
      <div className={classes["cart-items-wrapper"]}>
        <div className={classes.cartWrapper}>
          {cart.map((cartItem) => {
            return ( 
              <>
                <CartItem
                  key={cartItem.productId}
                  {...cartItem}
                  quantity ={undefined}
                  isWished={cartItem.isWished}
                  onRemove={() => onRemove(cartItem.productId)}
                  onWishlist={() =>
                    onWish({
                      id: cartItem.productId,  
                      isWished: cartItem.isWished,
                    })
                  }
                />
              </>
            );
          })}
        </div>
      </div>
      <Total  price={price} />
      {/* <CartSummary price={price} weight={weight} profit={profit} quantity={quantity} /> */}
      {/* <Rate rate={4.3} /> */}
      <Button def="main" mode="primary">
        Оформить
      </Button>
    </div>
  );
};

export default Cart;
