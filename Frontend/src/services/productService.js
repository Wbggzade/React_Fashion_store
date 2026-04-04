import { API_BASE_URL, toAbsoluteImageUrl } from './apiConfig';

const normalizeProduct = (product) => ({
  ...product,
  id: product._id || product.id,
  image: toAbsoluteImageUrl(product.image),
});

const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load products');
  }

  return data.map(normalizeProduct);
};

const fetchTrendingProducts = async (limit = 4) => {
  const response = await fetch(`${API_BASE_URL}/products?isTrending=true&limit=${limit}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load trending products');
  }

  return data.map(normalizeProduct);
};

const createProduct = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create product');
  }

  return normalizeProduct(data);
};

const updateProduct = async (productId, formData) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update product');
  }

  return normalizeProduct(data);
};

const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete product');
  }

  return data;
};

export { fetchProducts, fetchTrendingProducts, createProduct, updateProduct, deleteProduct };
