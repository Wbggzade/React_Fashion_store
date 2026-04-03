import { API_BASE_URL } from './apiConfig';

const loginAdmin = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

const logoutAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};

const getAdminProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Session validation failed');
  }

  return data;
};

export { loginAdmin, logoutAdmin, getAdminProfile };
