import classes from "./MenuIcon.module.css";

interface IMenuIconProps {
  width?: number;
  height?: number;
  fill?: string;
}
const MenuIcon: React.FC<IMenuIconProps> = ({
  width = 24,
  height = 24,
  fill = "#444B51",
}) => {
  return (
    <svg
      width="4"
      height="20"
      viewBox="0 0 4 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 12C3.10457 12 4 11.1046 4 10C4 8.89543 3.10457 8 2 8C0.89543 8 0 8.89543 0 10C0 11.1046 0.89543 12 2 12Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 20C3.10457 20 4 19.1046 4 18C4 16.8954 3.10457 16 2 16C0.89543 16 0 16.8954 0 18C0 19.1046 0.89543 20 2 20Z"
        fill={fill}
      />
    </svg>
  );
};

export default MenuIcon;
