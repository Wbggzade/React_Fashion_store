import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const parseBool = (value) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
};

const getProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.isTrending === 'true') {
      filter.isTrending = true;
    }

    let query = Product.find(filter).sort({ createdAt: -1 });

    const limit = parseInt(req.query.limit, 10);
    if (Number.isFinite(limit) && limit > 0) {
      query = query.limit(limit);
    }

    const products = await query;
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

    const isTrending = parseBool(req.body.isTrending);

    const product = await Product.create({
      name: String(name).trim(),
      price: numericPrice,
      category: String(category).trim(),
      description: description ? String(description).trim() : '',
      image: `/uploads/${req.file.filename}`,
      ...(isTrending !== undefined && { isTrending }),
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

const updateProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, category, description } = req.body;

    if (name !== undefined) {
      const trimmedName = String(name).trim();
      if (!trimmedName) {
        return res.status(400).json({ message: 'Name cannot be empty' });
      }
      product.name = trimmedName;
    }

    if (price !== undefined && price !== null && price !== '') {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: 'Price must be a valid non-negative number' });
      }
      product.price = numericPrice;
    }

    if (category !== undefined) {
      const trimmedCategory = String(category).trim();
      if (!trimmedCategory) {
        return res.status(400).json({ message: 'Category cannot be empty' });
      }
      product.category = trimmedCategory;
    }

    if (description !== undefined) {
      product.description = String(description).trim();
    }

    const isTrending = parseBool(req.body.isTrending);
    if (isTrending !== undefined) {
      product.isTrending = isTrending;
    }

    if (req.file) {
      // Remove old image file if it exists
      if (product.image) {
        const oldFilename = path.basename(product.image);
        const oldPath = path.join(uploadsDir, oldFilename);
        try {
          await fs.unlink(oldPath);
        } catch {
          // Safe to ignore if file was already removed
        }
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    const updated = await product.save();
    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
