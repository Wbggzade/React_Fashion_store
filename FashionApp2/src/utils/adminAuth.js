const ADMIN_TOKEN_KEY = 'adminToken';

const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);
const setAdminToken = (token) => localStorage.setItem(ADMIN_TOKEN_KEY, token);
const clearAdminToken = () => localStorage.removeItem(ADMIN_TOKEN_KEY);
const hasAdminToken = () => Boolean(getAdminToken());

export { getAdminToken, setAdminToken, clearAdminToken, hasAdminToken };
