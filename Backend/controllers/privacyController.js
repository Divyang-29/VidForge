const { createPrivacy, getPrivacy } = require("../models/privacyModel");

const addPrivacy = async (req, res) => {
  try {
    const { title, content } = req.body;

    const privacy = await createPrivacy(title, content);

    res.json(privacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPrivacy = async (req, res) => {
  try {
    const privacy = await getPrivacy();

    res.json(privacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPrivacy,
  getAllPrivacy,
};
