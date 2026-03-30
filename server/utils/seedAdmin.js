import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in environment variables');
    }

    await connectDB();

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase().trim() });

    if (existingAdmin) {
      console.log('Admin already exists. No changes made.');
      process.exit(0);
    }

    await Admin.create({
      email: ADMIN_EMAIL.toLowerCase().trim(),
      password: ADMIN_PASSWORD,
    });

    console.log('Admin seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`Failed to seed admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
