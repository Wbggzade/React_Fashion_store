import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from '../../store/cartSlice';
import styles from './Navbar.module.css';

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.bagItem}>
      <img src={item.image} alt={item.title} className={styles.bagImage} />
      <div className={styles.bagDetails}>
        <p>{item.title}</p>
        <div className={styles.qtyControls}>
          <button
            type="button"
            className={styles.qtyBtn}
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => dispatch(decrementItemQuantity(item.id))}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            className={styles.qtyBtn}
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => dispatch(incrementItemQuantity(item.id))}
          >
            +
          </button>
        </div>
        <span className={styles.lineTotal}>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <button
        type="button"
        className={styles.removeButton}
        aria-label={`Remove ${item.title} from bag`}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        ✕
      </button>
    </div>
  );
};

export default BagItem;
