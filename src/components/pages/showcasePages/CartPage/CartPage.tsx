import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NO_PRODUCTS_IN_CART } from "../../../../constants/messages";
import { PATHS } from "../../../../constants/routes";
import useForm from "../../../../hooks/useForm";
import { createOrder } from "../../../../store/CommonSlice";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  clearCart,
  setToLocalStorage,
  wishListHandler,
} from "../../../../store/UserSlice";
import {
  CartItem,
  Dish,
  Product,
  ProductCartItem,
} from "../../../../types/common";
import { cartFormValidator } from "../../../../utils/validators";
import Section from "../../../layouts/showcaseLayouts/Section/Section";
import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
import SectionHeader from "../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader";
import Cart from "../../../showcase/Cart/Cart";
import CartForm from "../../../showcase/CartForm/CartForm";
import Placeholder from "../../../UI/Placeholder/Placeholder";
import classes from "./CartPage.module.css";
import Back from "../../../UI/Back/Back";
import TopBar from "../../../UI/TopBar/TopBar";
import Title from "../../../UI/Title/Title";
import { removeProductFromCart } from "../../../../store/cartSlice";

const INIT_INPUT = {
  name: "",
  phone: "",
  address: "",
};

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items); // Обратите внимание на правильное использование состояния
  const {
    dishes,
    isLoading: dishesLoading,
    error: dishesError,
  } = useSelector((state: RootState) => state.discountedProducts);
  const { error, isLoading } = useSelector((state: RootState) => state.common);
  const { input, handleChange, errors, submit } = useForm(
    INIT_INPUT,
    handleSubmit,
    cartFormValidator
  );
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  const cartProducts: Dish[] = cart.map((cartItem) => {
    const product = dishes?.find(
      (product) => product.id === Number(cartItem.productId)
    );

    return {
      ...cartItem,
      id: product?.id,
      name: product?.name,
      image: product?.photo,
      categoryUrl: product?.category_id,
      description: product?.description,
      price: product?.price,
    };
  });

  const price = cart.reduce((res, val) => res + val.totalPrice, 0);
  const weight = +cart
    .reduce((res, val) => res + val.totalWeight, 0)
    .toFixed(2);
  const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
  const hasProducts = cart.length > 0;
  const summaryProps = {
    price,
    weight,
    profit,
  };

  const handleWishlist = ({
    id,
    isWished,
  }: {
    id: CartItem["productId"];
    isWished: boolean;
  }) => {
    dispatch(wishListHandler({ id, isWished }));
  };

  const handleRemoveCartItem = (id: Dish["id"]) => {
    dispatch(removeProductFromCart(String(id)));
    dispatch(setToLocalStorage("cart"));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(setToLocalStorage("cart"));
  };

  async function handleSubmit() {
    const order = {
      user: input,
      cart: cart,
      timestamp: Date.now(),
      totalPrice: price,
      totalWeight: weight,
      totalDiscount: profit,
    };

    await dispatch(createOrder(order));

    if (!error.isError && !isLoading) {
      navigate(`${PATHS.cart}/${PATHS.success}`);
      dispatch(clearCart());
      dispatch(setToLocalStorage("cart"));
    }
  }

  return (
    <>
      <div className={classes.Container}>
        <TopBar />
        <Back />
        <Title>Корзина</Title>
        <SectionBody>
          <>
            {!hasProducts && <Placeholder text={NO_PRODUCTS_IN_CART} />}

            {hasProducts && (
              <div className={classes["cart-page-body"]}>
                <Cart
                  cart={cartProducts}
                  onRemove={handleRemoveCartItem}
                  onWish={handleWishlist}
                  {...summaryProps}
                />
              </div>
            )}
          </>
        </SectionBody>
      </div>
    </>
  );
};

export default CartPage;