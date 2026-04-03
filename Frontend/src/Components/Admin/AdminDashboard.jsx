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
  onUpdateProduct,
  onDeleteProduct,
  onLogout,
  isSubmitting,
  actionMessage,
  actionError,
}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);

  const isEditing = editingProductId !== null;

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'image' ? files?.[0] ?? null : value,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setEditingProductId(null);
    setFormError('');
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id || product.id);
    setFormState({
      name: product.name || '',
      price: product.price ?? '',
      category: product.category || '',
      description: product.description || '',
      image: null, // image is optional on update
    });
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!formState.name || !formState.price || !formState.category) {
      setFormError('Name, price, and category are required.');
      return;
    }

    if (!isEditing && !formState.image) {
      setFormError('Image is required for new products.');
      return;
    }

    if (Number.isNaN(Number(formState.price)) || Number(formState.price) < 0) {
      setFormError('Price must be a valid non-negative number.');
      return;
    }

    if (isEditing) {
      await onUpdateProduct(editingProductId, formState, resetForm);
    } else {
      await onCreateProduct(formState, resetForm);
    }
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>

      <div className={styles.grid}>
        <article className={styles.panel}>
          <h2>{isEditing ? 'Edit Product' : 'Create Product'}</h2>
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

            <label htmlFor="image">{isEditing ? 'Replace Image (optional)' : 'Image'}</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} required={!isEditing} />

            {formError ? <p className={styles.error}>{formError}</p> : null}
            {actionError ? <p className={styles.error}>{actionError}</p> : null}
            {actionMessage ? <p className={styles.success}>{actionMessage}</p> : null}

            <div className={styles.formActions}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                  Cancel
                </button>
              )}
            </div>
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
                  <div className={styles.productActions}>
                    <button type="button" className={styles.editBtn} onClick={() => handleEditClick(product)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => onDeleteProduct(product._id || product.id)}>
                      Delete
                    </button>
                  </div>
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
