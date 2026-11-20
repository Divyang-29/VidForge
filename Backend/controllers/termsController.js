const { createTerms, getTerms } = require("../models/termsModel");

const addTerms = async (req, res) => {
  try {
    const { title, content } = req.body;

    const terms = await createTerms(title, content);

    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTerms = async (req, res) => {
  try {
    const terms = await getTerms();

    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTerms,
  getAllTerms,
};
