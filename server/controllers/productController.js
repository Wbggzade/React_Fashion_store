import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const getProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !category || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Price must be a valid non-negative number' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    const product = await Product.create({
      name: String(name).trim(),
      price: numericPrice,
      category: String(category).trim(),
      description: description ? String(description).trim() : '',
      image: `/uploads/${req.file.filename}`,
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.image) {
      const imageFilename = path.basename(product.image);
      const imagePath = path.join(uploadsDir, imageFilename);
      try {
        await fs.unlink(imagePath);
      } catch {
        // Keep delete safe even if file was already removed.
      }
    }

    await product.deleteOne();
    return res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    return next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
