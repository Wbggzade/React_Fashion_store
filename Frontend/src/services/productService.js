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

const createProduct = async (token, formData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create product');
  }

  return normalizeProduct(data);
};

const deleteProduct = async (token, productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete product');
  }

  return data;
};

export { fetchProducts, createProduct, deleteProduct };
