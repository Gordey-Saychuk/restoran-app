import { generatePath, Link } from "react-router-dom";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../../../constants/messages";
import { ProductCartItem } from "../../../../types/common";
import IconButton from "../../../UI/IconButton/IconButton";
import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
import TrashIcon from "../../../UI/icons/TrashIcon/TrashIcon";
import QuantityBlock from "../../QuantityBlock/QuantityBlock";
import classes from "./CartItem.module.css";

interface ICartItemProps {
  productId: ProductCartItem["productId"];
  name: ProductCartItem["name"];
  image: ProductCartItem["image"];
  price: ProductCartItem["price"];
  quantity?: ProductCartItem["quantity"];
  totalPrice?: ProductCartItem["totalPrice"];
  weight?: ProductCartItem["weight"];
  totalWeight?: ProductCartItem["totalWeight"];
  profit?: ProductCartItem["profit"];
  discount?: ProductCartItem["discount"];
  discountedPrice?: ProductCartItem["discountedPrice"];
  categoryUrl?: ProductCartItem["categoryUrl"];
  isWished?: ProductCartItem["isWished"];
  onWishlist?: () => void;
  onRemove?: () => void;
  description?: ProductCartItem["description"]; // Make description optional
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
}) => {
  const totalPriceWithoutDiscount = price * (quantity ?? 1);
  const truncatedDescription =
    description && description.length > 50
      ? `${description.slice(0, 50)}...`
      : description;

  return (
    <div className={classes["cart-item"]}>
      {onRemove && (
        <div className={classes["remove"]}>
          <IconButton onClick={onRemove}>
            <TrashIcon />
          </IconButton>
        </div>
      )}
      <div
        className={classes.imageWrapper}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={image} alt={name} className={classes.image} />
      </div>
      <div className={classes["product-info"]}>
        <div className={classes["product-name-wrapper"]}>
          <Link
            to={generatePath("/:categoryUrl/:id", {
              categoryUrl,
              id: productId,
            })}
            className={classes["product-name"]}
          >
            {name}
          </Link>
          <div className={classes["product-desc-wrapper"]}>
            {truncatedDescription}
          </div>
        </div>

        <div className={classes["price-quantity-wrapper"]}>
          {quantity !== undefined && <QuantityBlock id={productId} disableDecrement />}
          <div className={classes["price-wrapper"]}>
            <span
              className={`${classes.price} ${
                discount && classes["discount-price"]
              }`}
            >
              <span className={classes["price"]}>$ {totalPrice}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
