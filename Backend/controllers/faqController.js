const { createFAQ, getFAQs, deleteFAQ } = require("../models/faqModel");

const addFAQ = async (req, res) => {
  try {

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "All fields required" });
    }

    const faq = await createFAQ(question, answer);

    res.json(faq);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFAQs = async (req, res) => {
  try {

    const faqs = await getFAQs();

    res.json(faqs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFAQ = async (req, res) => {
  try {

    const { id } = req.params;

    await deleteFAQ(id);

    res.json({ message: "FAQ deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addFAQ,
  getAllFAQs,
  removeFAQ
};