import { useEffect, useState } from 'react';
import Banner from '../Components/Banner/Banner';
import GridCards from '../Components/Grid_Cards/GridCards';
import CarouselSlider from '../Components/Carousel/CarouselSlider';
import { fetchTrendingProducts } from '../services/productService';
import styles from './Home.module.css';

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingProducts();
        setTrendingProducts(data);
      } catch {
        setError('Failed to load trending products.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <div className={styles.homePage}>
      <Banner />

      <section className={styles.homeSection}>
        <div className={styles.sectionHeader}>
          <h2>Featured Collections</h2>
          <p>Discover our latest fashion picks and trending styles.</p>
        </div>
        <GridCards />
      </section>

      <section className={styles.homeSection}>
        <div className={styles.sectionHeader}>
          <h2>Trending Now</h2>
          <p>Browse popular items curated for a modern fashion experience.</p>
        </div>
        {isLoading && <p className={styles.statusText}>Loading trending products...</p>}
        {error && <p className={styles.errorText}>{error}</p>}
        {!isLoading && !error && trendingProducts.length === 0 && (
          <p className={styles.statusText}>No trending products yet.</p>
        )}
        {!isLoading && !error && trendingProducts.length > 0 && (
          <CarouselSlider products={trendingProducts} />
        )}
      </section>
    </div>
  );
}

export default Home;

