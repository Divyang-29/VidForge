const { createProduct } = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const primaryImage = req.files.primary_image?.[0]?.filename;
    const images = req.files.images?.map((img) => img.filename);

    const productData = {
      ...req.body,
      primary_image: primaryImage,
      images: images,
    };

    const product = await createProduct(productData);

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC",
  );

  res.json(result.rows);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM products WHERE id=$1", [id]);

  res.json({ message: "Product deleted" });
};

const pool = require("../config/db");

const getProductById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductById };

module.exports = {
 addProduct,
 getProducts,
 deleteProduct,
 getProductById
};