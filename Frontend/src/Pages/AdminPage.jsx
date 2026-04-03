import { useEffect, useState } from 'react';
import AdminLogin from '../Components/Admin/AdminLogin';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../services/authService';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setActionError('Failed to load products.');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await getAdminProfile();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    validateAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setProducts([]);
      return;
    }

    loadProducts();
  }, [isAuthenticated]);

  const handleLogin = async (credentials) => {
    setLoginError('');
    setIsLoggingIn(true);

    try {
      await loginAdmin(credentials);
      setIsAuthenticated(true);
      setActionMessage('');
      setActionError('');
    } catch (error) {
      setLoginError(error.message || 'Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch {
      // Clear state even if the request fails
    }
    setIsAuthenticated(false);
    setActionMessage('');
    setActionError('');
  };

  const handleCreateProduct = async (formValues, resetForm) => {
    setIsSubmitting(true);
    setActionError('');
    setActionMessage('');

    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('price', formValues.price);
      formData.append('category', formValues.category);
      formData.append('description', formValues.description);
      formData.append('image', formValues.image);

      await createProduct(formData);
      setActionMessage('Product created successfully.');
      resetForm();
      await loadProducts();
    } catch (error) {
      setActionError(error.message || 'Failed to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (productId, formValues, done) => {
    setIsSubmitting(true);
    setActionError('');
    setActionMessage('');

    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('price', formValues.price);
      formData.append('category', formValues.category);
      formData.append('description', formValues.description);
      if (formValues.image) {
        formData.append('image', formValues.image);
      }

      await updateProduct(productId, formData);
      setActionMessage('Product updated successfully.');
      done();
      await loadProducts();
    } catch (error) {
      setActionError(error.message || 'Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setActionError('');
    setActionMessage('');

    try {
      await deleteProduct(productId);
      setActionMessage('Product deleted successfully.');
      await loadProducts();
    } catch (error) {
      setActionError(error.message || 'Failed to delete product.');
    }
  };

  if (isCheckingAuth) {
    return <div className={styles.status}>Checking admin session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.adminPage}>
        <AdminLogin onLogin={handleLogin} isLoading={isLoggingIn} errorMessage={loginError} />
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      {isLoadingProducts ? (
        <div className={styles.status}>Loading products...</div>
      ) : (
        <AdminDashboard
          products={products}
          onCreateProduct={handleCreateProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onLogout={handleLogout}
          isSubmitting={isSubmitting}
          actionMessage={actionMessage}
          actionError={actionError}
        />
      )}
    </div>
  );
};

export default AdminPage;
