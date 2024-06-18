import { useState } from "react";
import { ProductCartItem } from "../../../types/common";
import Button from "../../UI/Button/Button";
import TableNumber from "../../UI/TableNumber/TableNumber";
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
  quantity: ProductCartItem["quantity"];
}

const Cart: React.FC<ICartProps> = ({
  cart,
  onRemove,
  onWish,
  price,
  weight,
  profit,
  quantity,
}) => {


  const [numberTable, setNumberTable] = useState(0);


  const handleTable = (e : any ) => {
    let inputValue = e.target.value;

    if (inputValue === '') {
      inputValue = '0';
    } else {
      if (inputValue.length > 1 && inputValue.startsWith('0')) {
        inputValue = inputValue.slice(1);
      }

      if (Number(inputValue) > 99) {
        inputValue = '99';
      }
    }
    setNumberTable(inputValue)
  }



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
      <Total number={1000} />
      <TableNumber number={numberTable} onChange={handleTable}  />
      {/* <Rate rate={4.3} /> */}
      <Button def="main" mode="primary">
        Оформить
      </Button>
    </div>
  );
};

export default Cart;
