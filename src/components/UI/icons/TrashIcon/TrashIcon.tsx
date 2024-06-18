import classes from "./TrashIcon.module.css";

interface ITrashIconProps {
  width?: number;
  height?: number;
  fill?: string;
}
const TrashIcon: React.FC<ITrashIconProps> = ({
  width = 20,
  height = 20,
  fill = "#222222",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#FF5656"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
  );
};

export default TrashIcon;
