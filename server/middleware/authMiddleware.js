import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const protectAdmin = async (req, res, next) => {
  try {
    let token = '';

    // Prefer httpOnly cookie
    if (req.cookies?.admin_token) {
      token = req.cookies.admin_token;
    } else {
      // Fallback to Authorization header for backward compat
      const authHeader = req.headers.authorization || '';
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized: token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin access required' });
    }

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized: admin not found' });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized: invalid token' });
  }
};

export { protectAdmin };
