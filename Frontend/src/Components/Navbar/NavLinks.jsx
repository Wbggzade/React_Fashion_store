import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const navLinkClass = ({ isActive }) => isActive ? styles.activeLink : styles.link;

const NavLinks = () => (
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
);

export default NavLinks;
