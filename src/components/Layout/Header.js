import { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import Button from './Button';
import classes from './Header.module.css';

const Header = ({ onShowCart }) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <Button onClick={onShowCart} />
      </header>

      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of food!' />
      </div>
    </Fragment>
  );
};

export default Header;
