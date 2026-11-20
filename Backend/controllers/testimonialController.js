const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require("../models/testimonialModel");

const addTestimonial = async (req, res) => {
  try {
    const { testimonial, writer_name, position } = req.body;

    const data = await createTestimonial({
      testimonial,
      writer_name,
      position,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const data = await getTestimonials();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteTestimonial(id);

    res.json({
      message: "Testimonial deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTestimonial,
  getAllTestimonials,
  removeTestimonial,
};
