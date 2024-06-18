import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  decrement,
  increment,
  removeProductFromCart,
  setToLocalStorage,
} from "../../../store/UserSlice";
import classes from "./QuantityBlock.module.css";

interface IQuantityBlockProps {
  id: string;
  disableDecrement?: boolean;
}

const QuantityBlock: React.FC<IQuantityBlockProps> = ({
  id,
  disableDecrement = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const productInCart = cart.find((cartItem) => cartItem.productId === id);
  const isDisabled = disableDecrement && productInCart?.quantity === 1;

  const incrementHandler = () => {
    dispatch(increment(id));
    dispatch(setToLocalStorage("cart"));
  };

  const decrementHandler = () => {
    dispatch(decrement(id));
    dispatch(setToLocalStorage("cart"));

    if (productInCart?.quantity === 1) {
      dispatch(removeProductFromCart(id));
      dispatch(setToLocalStorage("cart"));
      return;
    }
  };

  return (
    <div
      className={classes["quantity-block"]}
    >
      <button
        className={classes.button}
        onClick={decrementHandler}
        disabled={isDisabled}
      >
        <span className={classes["button-text"]}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 21C15.5228 21 20 16.5228 20 11C20 5.47715 15.5228 1 10 1C4.47715 1 0 5.47715 0 11C0 16.5228 4.47715 21 10 21Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 11H14"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <span className={classes.quantity}>{productInCart?.quantity || 1}</span>
      <button className={classes.button} onClick={incrementHandler}>
        <span className={classes["button-text"]}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 7V15"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 11H15"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default QuantityBlock;
