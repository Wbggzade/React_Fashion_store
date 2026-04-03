import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = generateToken(admin._id);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: COOKIE_MAX_AGE,
    });

    return res.status(200).json({
      _id: admin._id,
      email: admin.email,
    });
  } catch (error) {
    return next(error);
  }
};

const logoutAdmin = (_req, res) => {
  res.cookie(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 0,
  });
  return res.status(200).json({ message: 'Logged out' });
};

const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    _id: req.admin._id,
    email: req.admin.email,
  });
};

export { loginAdmin, logoutAdmin, getAdminProfile };
