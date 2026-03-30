

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Shop.module.css';
import { addToCart } from '../store/cartSlice';
import { fetchProducts } from '../services/productService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const categoryOptions = ['All', ...new Set(products.map((product) => product.category))];
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
    const loadProducts = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setLoadError(error.message || 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

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
        {categoryOptions.map((category) => (
          <button
            key={category}
            className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className={styles.products}>
        {isLoading ? (
          <div className={styles.emptyProductsState}>
            <h3>Loading products...</h3>
          </div>
        ) : loadError ? (
          <div className={styles.emptyProductsState}>
            <h3>Unable to load products</h3>
            <p>{loadError}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
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
