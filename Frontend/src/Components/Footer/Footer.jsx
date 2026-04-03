
import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.brand}>&copy; 2024 Fashion App. Modern wardrobe essentials for every day.</p>
        <p className={styles.meta}>Free standard shipping on orders over $150.</p>
      </div>
      <div className={styles.social_links}>
        <Link to="/shop" className={styles.social_icon}>New Arrivals</Link>
        <Link to="/about-us" className={styles.social_icon}>Our Story</Link>
        <Link to="/customer-care" className={styles.social_icon}>Customer Care</Link>
      </div>
    </footer>
  );
};

export default Footer;