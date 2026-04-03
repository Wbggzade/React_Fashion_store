
import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.css';


const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.banner}>
      <div className={styles.quote_box}>
        <span className={styles.eyebrow}>New Season Edit</span>
        <h1 className={styles.quote}>Refined silhouettes for days that move from city mornings to late dinners.</h1>
        <p className={styles.description}>Discover tailored layers, soft knits, and polished essentials designed to stay relevant beyond a single season.</p>
        <button type="button" onClick={() => navigate('/shop')}>Shop the Collection</button>
      </div>
    </div>
  );
};

export default Banner;

