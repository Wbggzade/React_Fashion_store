/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './AdminDashboard.module.css';

const initialFormState = {
  name: '',
  price: '',
  category: '',
  description: '',
  image: null,
};

const AdminDashboard = ({
  products,
  onCreateProduct,
  onDeleteProduct,
  onLogout,
  isSubmitting,
  actionMessage,
  actionError,
}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'image' ? files?.[0] ?? null : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!formState.name || !formState.price || !formState.category || !formState.image) {
      setFormError('Name, price, category, and image are required.');
      return;
    }

    if (Number.isNaN(Number(formState.price)) || Number(formState.price) < 0) {
      setFormError('Price must be a valid non-negative number.');
      return;
    }

    await onCreateProduct(formState, () => setFormState(initialFormState));
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>

      <div className={styles.grid}>
        <article className={styles.panel}>
          <h2>Create Product</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formState.name} onChange={handleChange} required />

            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formState.price}
              onChange={handleChange}
              required
            />

            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={formState.category} onChange={handleChange} required />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formState.description} onChange={handleChange} rows="3" />

            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} required />

            {formError ? <p className={styles.error}>{formError}</p> : null}
            {actionError ? <p className={styles.error}>{actionError}</p> : null}
            {actionMessage ? <p className={styles.success}>{actionMessage}</p> : null}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Create Product'}
            </button>
          </form>
        </article>

        <article className={styles.panel}>
          <h2>Current Products</h2>
          {products.length === 0 ? (
            <p className={styles.empty}>No products found.</p>
          ) : (
            <ul className={styles.productList}>
              {products.map((product) => (
                <li key={product._id || product.id} className={styles.productItem}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category} - ${Number(product.price).toFixed(2)}</p>
                  </div>
                  <button type="button" onClick={() => onDeleteProduct(product._id || product.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
};

export default AdminDashboard;
