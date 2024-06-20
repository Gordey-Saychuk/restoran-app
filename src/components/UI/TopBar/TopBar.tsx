import React from "react";
import style from "./topbar.module.css";
import MenuIcon from "../icons/MenuIcon/MenuIcon";
import CartIcon from "../icons/CartIcon/CartIcon";
import Badge from "../Badge/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SwitchLanguageIcon from "../icons/SwitchLanguageIcon/SwitchLanguageIcon";

interface TopBar {
  fill?: string;
}

const TopBar: React.FC<TopBar> = ({ fill }) => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={style.TopBar}>
      {/* <Badge count={0} to="#" icon={<MenuIcon fill={fill} />} /> */}
      <Badge
        count={0}
        to="/language"
        icon={<SwitchLanguageIcon fill={fill} />}
      />
      <Badge
        count={cart.length}
        to="/cart"
        icon={<CartIcon fill={fill} /> }
      />
      {/* <a href="/cart">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="5"
            width="18"
            height="18"
            rx="2"
            stroke={"gray"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2V6"
            stroke={"gray"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2C14 2 11.9008 1 9.93066 1C7.96055 1 6 2 6 2V6"
            stroke={"gray"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a> */}
    </div>
  );
};

export default TopBar;
