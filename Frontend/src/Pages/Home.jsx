import React from 'react';
import Banner from '../Components/Banner/Banner';
import GridCards from '../Components/Grid_Cards/GridCards';
import CarouselSlider from '../Components/Carousel/CarouselSlider';
import styles from './Home.module.css';

function Home() {
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
        <CarouselSlider />
      </section>
    </div>
  );
}

export default Home;

