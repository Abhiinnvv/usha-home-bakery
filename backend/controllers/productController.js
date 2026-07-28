const Product =
  require("../models/Product");

const getProducts =
  async (req, res) => {
    const products =
      await Product.find();

    res.json(products);
  };

const getProductById =
  async (req, res) => {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found"
      });
    }

    res.json(product);
  };

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      stock,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : "",
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description =
      req.body.description || product.description;
    product.category =
      req.body.category || product.category;

    product.stock =
      req.body.stock ?? product.stock;

    if (req.file) {
      product.image =
        `/uploads/products/${req.file.filename}`;
    }

    const updated = await product.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProduct =
  async (req, res) => {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted"
    });
  };
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (review) =>
        review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product.",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    await product.save();

    res.status(201).json({
      message: "Review added successfully.",
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};