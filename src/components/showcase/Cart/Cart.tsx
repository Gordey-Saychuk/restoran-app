import { useEffect, useState } from "react";
import { Dish, ProductCartItem } from "../../../types/common";
import Button from "../../UI/Button/Button";
import TableNumber from "../../UI/TableNumber/TableNumber";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import Total from "./Total/Total";
import Title from "../../UI/Title/Title";
import TrashIcon from "../../UI/icons/TrashIcon/TrashIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchDishes } from "../../../store/discountedProductsSlice";
import { fetchCategories } from "../../../store/categoriesSlice";

interface ICartProps {
  cart: Dish[];
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);
  console.log(categories);
  console.log(selectedTable);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDishes(1))
    dispatch(fetchCategories(1))
  }, []);

  const handleTable = (index: number) => {
    setSelectedTable(index);
    toggleModal();
  };
  const DEFAULT_IMAGE_URL =
    "https://cdn.icon-icons.com/icons2/4135/PNG/512/plate_dish_food_dinnerware_icon_260731.png";

  return (
    <div className={classes.cart}>
      <div className={classes["cart-items-wrapper"]}>
        <div className={classes.cartWrapper}>
          {cart.map((cartItem) => {
            console.log(cartItem);
            return (
              <>
                <CartItem
                  productId={cartItem.id}
                  name={cartItem.name}
                  price={cartItem.price}
                  image={DEFAULT_IMAGE_URL}
                  description={cartItem.description}
                  categoryUrl={`category-${cartItem.category_id}`}
                />
              </>
            );
          })}
        </div>
      </div>
      <Total price={price} />
      {/* <TableNumber
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      /> */}

      <div className={classes.tableBtn} onClick={toggleModal}>
        <div>Выбрать столик : </div>{" "}
        {selectedTable === 0 ? (
          <div style={{ color: "white" }}>"Не выбран"</div>
        ) : (
          `№ ${selectedTable}`
        )}
      </div>

      <Button def="main" mode="primary">
        Оформить
      </Button>
      <div className={showModal ? classes.modalActive : classes.modal}>
        <Title>Заголовок</Title>
        <div onClick={() => handleTable(1)} className={classes.itemModal}>
          Столик номер №1
        </div>
        <div onClick={() => handleTable(2)} className={classes.itemModal}>
          Столик номер №2
        </div>
        <div onClick={() => handleTable(3)} className={classes.itemModal}>
          Столик номер №3
        </div>
        <div onClick={toggleModal} className={classes.closeModal}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default Cart;
