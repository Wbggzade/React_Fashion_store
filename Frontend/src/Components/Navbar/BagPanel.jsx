import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import BagItem from './BagItem';
import styles from './Navbar.module.css';

const BagPanel = ({ items, bagTotal, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.bagPanel} role="region" aria-label="Shopping bag">
      <div className={styles.bagHeader}>
        <h3>My Bag</h3>
        <div className={styles.bagHeaderActions}>
          {items.length > 0 && (
            <button
              type="button"
              className={styles.clearBag}
              onClick={() => dispatch(clearCart())}
            >
              Clear Bag
            </button>
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyBagState}>
          <p className={styles.emptyBag}>Your bag is empty.</p>
          <NavLink
            to="/shop"
            className={styles.emptyBagLink}
            onClick={onClose}
          >
            Browse the collection &rarr;
          </NavLink>
        </div>
      ) : (
        <>
          <div className={styles.bagItems}>
            {items.map((item) => (
              <BagItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.bagFooter}>
            <strong>Total</strong>
            <strong>${bagTotal.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default BagPanel;
