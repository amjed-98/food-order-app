import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/Cart-context';
import classes from './Button.module.css';
import CartIcon from '../Cart/CartIcon';

const Button = ({ onClick }) => {
  const cartCtx = useContext(CartContext);

  const [activeBtn, setActiveBtn] = useState(false);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${activeBtn && classes.bump}`;

  useEffect(() => {
    if (!items.length) {
      return;
    }

    setActiveBtn(true);

    const timer = setTimeout(() => {
      setActiveBtn(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default Button;
