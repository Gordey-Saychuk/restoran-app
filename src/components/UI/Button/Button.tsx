import Spinner from '../Spinner/Spinner';
import classes from './Button.module.css';

interface IProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface IButtonProps {
  children?: string;
  mode: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  def?: 'default' | 'main';
  product?: IProduct;  
}


const Button: React.FC<IButtonProps> = ({ type = 'button', children, onClick, mode, isDisabled = false, isLoading, def = "", product }) => {
  return (
    <button disabled={isDisabled || isLoading} className={`${classes.button} ${classes[mode]} ${classes[def]}`} onClick={onClick} type={type}>
      {isLoading && <Spinner />}
      { children}
    </button>
  );
};

export default Button;

