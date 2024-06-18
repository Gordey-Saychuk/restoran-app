import classes from "./CartIcon.module.css";

interface ICartIconProps {
  width?: number;
  height?: number;
  filled?: boolean;
  fill?: string;
}
const CartIcon: React.FC<ICartIconProps> = ({
  width = 20,
  height = 20,
  filled = false,
  fill = "#444B51",
}) => {
  return (
    <svg
      width={width}
      height={height}
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
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 2V6"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 2C14 2 11.9008 1 9.93066 1C7.96055 1 6 2 6 2V6"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
