/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onLogin, isLoading, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <section className={styles.loginCard}>
      <h1>Admin Login</h1>
      <p>Sign in to manage catalog products.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
