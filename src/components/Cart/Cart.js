import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/Cart-context';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = ({ onHideCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  // cart Context
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // check if there is items in the cart
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setIsSubmitted(false);

    await fetch(
      'https://react-http-50e31-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={onHideCart}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onHideCart} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {isSubmitting && <p>Sending Your Order...</p>}
      {!isSubmitting && !isSubmitted && cartModalContent}

      {isSubmitted && (
        <React.Fragment>
          <p>Thank you for your Order, our delivery will contact you soon</p>

          <div className={classes.actions}>
            <button className={classes.button} onClick={onHideCart}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
