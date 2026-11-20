const {
  createReview,
  getReviews,
  deleteReview,
} = require("../models/reviewModel");

const addReview = async (req, res) => {
  try {
    const { review, name, position, rating } = req.body;

    const image = req.file ? req.file.filename : null;

    const data = await createReview({
      review,
      name,
      position,
      rating,
      image,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const data = await getReviews();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeReview = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteReview(id);

    res.json({
      message: "Review deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  removeReview,
};
