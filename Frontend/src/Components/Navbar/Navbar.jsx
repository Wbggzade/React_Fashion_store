
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import NavLinks from './NavLinks';
import NavActions from './NavActions';
import BagPanel from './BagPanel';

const Navbar = () => {
  const [isBagOpen, setIsBagOpen] = useState(false);
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
      <NavLinks />
      <NavActions
        bagCount={bagCount}
        isBagOpen={isBagOpen}
        onToggleBag={() => setIsBagOpen((prev) => !prev)}
      >
        <BagPanel
          items={items}
          bagTotal={bagTotal}
          onClose={() => setIsBagOpen(false)}
        />
      </NavActions>
    </nav>
  );
};

export default Navbar;


