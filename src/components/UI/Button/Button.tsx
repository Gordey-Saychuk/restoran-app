import Spinner from '../Spinner/Spinner';
import classes from './Button.module.css';

interface IButtonProps {
  children?: string;
  mode: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  def? : 'default' | 'main';
}

const Button: React.FC<IButtonProps> = ({ type = 'button', children, onClick, mode, isDisabled = false, isLoading, def="" }) => {
  return (
    <button disabled={isDisabled || isLoading} className={`${classes.button} ${classes[mode]} ${classes[def]}`} onClick={onClick} type={type}>
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
