

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Shop.module.css';
import { addToCart } from '../store/cartSlice';
import { products } from '../data/products';

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseProduct();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

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
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyProductsState}>
            <h3>No items found</h3>
            <p>Try a different category to browse more of the collection.</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleOpenProduct(product)}
              >
                Select Options
              </button>
            </div>
          ))
        )}
      </section>

      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={handleCloseProduct}>
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-name"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImage} />
            <div className={styles.modalContent}>
              <p className={styles.modalLabel}>{selectedProduct.category}</p>
              <h2 id="modal-product-name">{selectedProduct.name}</h2>
              <p className={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</p>

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
