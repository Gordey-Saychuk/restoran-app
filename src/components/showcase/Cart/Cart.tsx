import { useEffect, useState } from "react";
import { ProductCartItem } from "../../../types/common";
import Button from "../../UI/Button/Button";
import TableNumber from "../../UI/TableNumber/TableNumber";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import Total from "./Total/Total";
import Title from "../../UI/Title/Title";
import TrashIcon from "../../UI/icons/TrashIcon/TrashIcon";

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
  const [selectedTable, setSelectedTable] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  console.log(selectedTable);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const handleTable = (index: number) => {
    setSelectedTable(index);
    toggleModal();
  };

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
                  quantity={undefined}
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
      {showModal && (
        <div className={firstLoad ?  classes.modalInitial : classes.modalActive}>
          <Title>Выбор стола</Title>
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
      )}
    </div>
  );
};

export default Cart;
