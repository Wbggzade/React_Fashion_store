import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const values = [
    {
      title: 'Quality Materials',
      description: 'We use only the finest fabrics and materials to ensure durability and comfort in every piece.'
    },
    {
      title: 'Modern Design',
      description: 'Our designs blend contemporary trends with timeless elegance for versatile, stylish looks.'
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide exceptional service and support at every step.'
    }
  ];

  const whyChooseUs = [
    'New seasonal collections updated regularly',
    'Premium curated pieces from top designers',
    'Timeless everyday fashion for all occasions'
  ];

  return (
    <div className={styles.aboutUsPage}>
      <section className={styles.hero}>
        <h1>About Our Brand</h1>
        <p>Crafting timeless fashion with passion and precision</p>
        <div className={styles.accentLine}></div>
      </section>

      <section className={styles.brandStory}>
        <div className={styles.storyContent}>
          <h2>Our Story</h2>
          <p>
            Founded with a vision to redefine modern fashion, our brand combines innovative design
            with exceptional craftsmanship. We believe that fashion should be accessible, sustainable,
            and empowering for everyone.
          </p>
          <p>
            From our humble beginnings to becoming a trusted name in fashion, we've remained committed
            to quality, creativity, and customer satisfaction. Every piece in our collection tells a story
            of dedication and style.
          </p>
        </div>
        <div className={styles.storyImage}>
          <div className={styles.placeholderImage}>
            <span>Brand Story Image</span>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <div className={styles.cardAccent}></div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.whyChooseUs}>
        <h2>Why Choose Us</h2>
        <div className={styles.infoBlocks}>
          {whyChooseUs.map((item, index) => (
            <div key={index} className={styles.infoBlock}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p>Ready to discover your perfect style?</p>
        <button className={styles.ctaButton}>Explore Collection</button>
      </section>
    </div>
  );
};

export default AboutUs;

