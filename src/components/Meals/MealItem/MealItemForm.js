import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = ({ onAddToCart }) => {
  // error Msg handle
  const [amountIsValid, setAmountIsValid] = useState(true);

  // amount input handle
  const amountInputRef = useRef();

  // on form submit
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;

    if (!enteredAmount.trim().length) {
      setAmountIsValid(false);
    }

    onAddToCart(+enteredAmount);
  };
  // generate id
  const randomId = Math.random();
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: randomId,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>please enter a valid amount [1-5]</p>}
    </form>
  );
};
export default MealItemForm;
