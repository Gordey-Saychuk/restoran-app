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


    const { cart } = useSelector((state: RootState) => state.user);

    


  return (
    <div className={style.TopBar}>
      {/* <Badge count={0} to="#" icon={<MenuIcon fill={fill} />} /> */}
      <Badge count={0} to="/#" icon={<SwitchLanguageIcon fill={fill}/>} />
      <Badge count={cart.length} to="/cart" icon={<CartIcon fill={fill} />} />
    </div>
  );
};

export default TopBar;
