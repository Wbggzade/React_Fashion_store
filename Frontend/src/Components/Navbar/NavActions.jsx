import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavActions = ({ bagCount, isBagOpen, onToggleBag, children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.navIcons}>
      <button type="button" onClick={() => navigate('/customer-care')}>Client Services</button>
      <button type="button" onClick={() => navigate('/shop')}>Browse New In</button>
      <div className={styles.bagWrapper}>
        <button
          type="button"
          aria-label={`Open bag, ${bagCount} item${bagCount !== 1 ? 's' : ''}`}
          aria-expanded={isBagOpen}
          onClick={onToggleBag}
        >
          Bag ({bagCount})
        </button>

        {isBagOpen && children}
      </div>
    </div>
  );
};

export default NavActions;
