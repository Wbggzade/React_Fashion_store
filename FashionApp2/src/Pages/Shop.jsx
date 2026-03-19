

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Shop.module.css';
import { addToCart } from '../store/cartSlice';

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: 'Elegant Dress', category: 'Women', price: 89.99, image: 'https://via.placeholder.com/300x200?text=Elegant+Dress' },
    { id: 2, name: 'Casual Blouse', category: 'Women', price: 49.99, image: 'https://via.placeholder.com/300x200?text=Casual+Blouse' },
    { id: 3, name: 'Slim Fit Jeans', category: 'Men', price: 79.99, image: 'https://via.placeholder.com/300x200?text=Slim+Fit+Jeans' },
    { id: 4, name: 'Leather Jacket', category: 'Men', price: 129.99, image: 'https://via.placeholder.com/300x200?text=Leather+Jacket' },
    { id: 5, name: 'Designer Handbag', category: 'Accessories', price: 199.99, image: 'https://via.placeholder.com/300x200?text=Designer+Handbag' },
    { id: 6, name: 'Stylish Sunglasses', category: 'Accessories', price: 59.99, image: 'https://via.placeholder.com/300x200?text=Stylish+Sunglasses' },
    { id: 7, name: 'Summer Sandals', category: 'New Arrivals', price: 39.99, image: 'https://via.placeholder.com/300x200?text=Summer+Sandals' },
    { id: 8, name: 'Classic Watch', category: 'New Arrivals', price: 149.99, image: 'https://via.placeholder.com/300x200?text=Classic+Watch' },
  ];

  const filteredProducts = activeFilter === 'All' ? products : products.filter(product => product.category === activeFilter);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProduct) {
      return;
    }

    dispatch(addToCart({ ...selectedProduct, quantity }));
    handleCloseProduct();
  };

  return (
    <div className={styles.shopPage}>
      <section className={styles.hero}>
        <h1>Shop Collection</h1>
        <p>Discover the latest fashion trends and elevate your style</p>
        <div className={styles.accentLine}></div>
      </section>

      <section className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'All' ? styles.active : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'Women' ? styles.active : ''}`}
          onClick={() => setActiveFilter('Women')}
        >
          Women
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'Men' ? styles.active : ''}`}
          onClick={() => setActiveFilter('Men')}
        >
          Men
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'Accessories' ? styles.active : ''}`}
          onClick={() => setActiveFilter('Accessories')}
        >
          Accessories
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'New Arrivals' ? styles.active : ''}`}
          onClick={() => setActiveFilter('New Arrivals')}
        >
          New Arrivals
        </button>
      </section>

      <section className={styles.products}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.price}>${product.price}</p>
            <button
              className={styles.addToCartBtn}
              onClick={() => handleOpenProduct(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={handleCloseProduct}>
          <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImage} />
            <div className={styles.modalContent}>
              <p className={styles.modalLabel}>Confirm selection</p>
              <h2>{selectedProduct.name}</h2>
              <p className={styles.modalCategory}>{selectedProduct.category}</p>
              <p className={styles.modalPrice}>${selectedProduct.price}</p>

              <label className={styles.quantityLabel} htmlFor="product-quantity">
                Quantity
              </label>
              <input
                id="product-quantity"
                type="number"
                min="1"
                value={quantity}
                className={styles.quantityInput}
                onChange={(event) => setQuantity(Math.max(Number(event.target.value) || 1, 1))}
              />

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryButton} onClick={handleCloseProduct}>
                  Cancel
                </button>
                <button type="button" className={styles.primaryButton} onClick={handleConfirmAddToCart}>
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
