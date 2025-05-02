import Product from '../models/Product.js';
export const listProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};
export const createProduct = async (req, res) => {
  const prod = await Product.create(req.body);
  res.status(201).json(prod);
};
