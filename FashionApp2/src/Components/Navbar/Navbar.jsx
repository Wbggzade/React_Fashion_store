
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import { removeFromCart } from '../../store/cartSlice';

const Navbar = () => {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const bagCount = items.reduce((total, item) => total + item.quantity, 0);
  const bagTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_logo}>
        <span className={styles.nav_span}>Fashion App</span>
      </div>
      <ul className={styles.Menu}>
        <li className={styles.link}>
          <Link to="./" className={styles.link}>Home</Link>
        </li>
        <li className={styles.link}>
          <Link to="./Shop" className={styles.link}>Shop</Link>
        </li>
        <li className={styles.link}>
          <Link to="./Customer_care" className={styles.link}>Customer Care</Link>
        </li>
        <li className={styles.link}>
          <Link to="./AboutUs" className={styles.link}>About Us</Link>
        </li>
      </ul>
      <div className={styles.navIcons}>
        <button>Login</button>
        <button>Search</button>
        <div className={styles.bagWrapper}>
          <button
            type="button"
            onClick={() => setIsBagOpen((previousValue) => !previousValue)}
          >
            Bag ({bagCount})
          </button>

          {isBagOpen && (
            <div className={styles.bagPanel}>
              <div className={styles.bagHeader}>
                <h3>My Bag</h3>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setIsBagOpen(false)}
                >
                  Close
                </button>
              </div>

              {items.length === 0 ? (
                <p className={styles.emptyBag}>Your bag is empty.</p>
              ) : (
                <>
                  <div className={styles.bagItems}>
                    {items.map((item) => (
                      <div key={item.id} className={styles.bagItem}>
                        <img src={item.image} alt={item.title} className={styles.bagImage} />
                        <div className={styles.bagDetails}>
                          <p>{item.title}</p>
                          <span>Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className={styles.bagFooter}>
                    <strong>Total</strong>
                    <strong>${bagTotal.toFixed(2)}</strong>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



