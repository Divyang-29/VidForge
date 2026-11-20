const {
  createMember,
  getMembers,
  deleteMember,
} = require("../models/memberModel");

const addMember = async (req, res) => {
  try {
    const { name, position } = req.body;

    const image = req.file ? req.file.filename : null;

    const member = await createMember({
      name,
      position,
      image,
    });

    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await getMembers();

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteMember(id);

    res.json({
      message: "Member deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMember,
  getAllMembers,
  removeMember,
};
