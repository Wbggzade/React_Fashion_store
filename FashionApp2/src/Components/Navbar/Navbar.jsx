
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import {
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} from '../../store/cartSlice';

const navLinkClass = ({ isActive }) => isActive ? styles.activeLink : styles.link;

const Navbar = () => {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const bagCount = items.reduce((total, item) => total + item.quantity, 0);
  const bagTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_logo}>
        <NavLink to="/" className={styles.logoLink}>
          <span className={styles.nav_span}>Fashion App</span>
        </NavLink>
      </div>
      <ul className={styles.Menu}>
        <li>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
        </li>
        <li>
          <NavLink to="/customer-care" className={navLinkClass}>Customer Care</NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
        </li>
      </ul>
      <div className={styles.navIcons}>
        <button type="button" onClick={() => navigate('/customer-care')}>Client Services</button>
        <button type="button" onClick={() => navigate('/shop')}>Browse New In</button>
        <div className={styles.bagWrapper}>
          <button
            type="button"
            aria-label={`Open bag, ${bagCount} item${bagCount !== 1 ? 's' : ''}`}
            aria-expanded={isBagOpen}
            onClick={() => setIsBagOpen((prev) => !prev)}
          >
            Bag ({bagCount})
          </button>

          {isBagOpen && (
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
                    onClick={() => setIsBagOpen(false)}
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
                    onClick={() => setIsBagOpen(false)}
                  >
                    Browse the collection &rarr;
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className={styles.bagItems}>
                    {items.map((item) => (
                      <div key={item.id} className={styles.bagItem}>
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



