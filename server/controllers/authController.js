import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

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

    return res.status(200).json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    return next(error);
  }
};

const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    _id: req.admin._id,
    email: req.admin.email,
  });
};

export { loginAdmin, getAdminProfile };
