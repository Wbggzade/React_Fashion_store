import { useEffect, useState } from 'react';
import AdminLogin from '../Components/Admin/AdminLogin';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import { loginAdmin, getAdminProfile } from '../services/authService';
import { fetchProducts, createProduct, deleteProduct } from '../services/productService';
import { getAdminToken, setAdminToken, clearAdminToken } from '../utils/adminAuth';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [token, setToken] = useState(getAdminToken());
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
      const existingToken = getAdminToken();
      if (!existingToken) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        await getAdminProfile(existingToken);
        setToken(existingToken);
      } catch {
        clearAdminToken();
        setToken('');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    validateAuth();
  }, []);

  useEffect(() => {
    if (!token) {
      setProducts([]);
      return;
    }

    loadProducts();
  }, [token]);

  const handleLogin = async (credentials) => {
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const result = await loginAdmin(credentials);
      setAdminToken(result.token);
      setToken(result.token);
      setActionMessage('');
      setActionError('');
    } catch (error) {
      setLoginError(error.message || 'Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setToken('');
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

      await createProduct(token, formData);
      setActionMessage('Product created successfully.');
      resetForm();
      await loadProducts();
    } catch (error) {
      setActionError(error.message || 'Failed to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setActionError('');
    setActionMessage('');

    try {
      await deleteProduct(token, productId);
      setActionMessage('Product deleted successfully.');
      await loadProducts();
    } catch (error) {
      setActionError(error.message || 'Failed to delete product.');
    }
  };

  if (isCheckingAuth) {
    return <div className={styles.status}>Checking admin session...</div>;
  }

  if (!token) {
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
