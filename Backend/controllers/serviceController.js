const {
  createService,
  getServices,
  deleteService,
} = require("../models/serviceModel");

const addService = async (req, res) => {
  try {
    const { title, description, bullets, heading, heading_desc } = req.body;

    const primaryImage = req.files["primary_image"]
      ? req.files["primary_image"][0].filename
      : null;

    const image2 = req.files["image2"] ? req.files["image2"][0].filename : null;

    const service = await createService({
      title,
      description,
      primary_image: primaryImage,
      bullets: bullets.split(","),
      image2,
      heading,
      heading_desc,
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await getServices();

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeService = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteService(id);

    res.json({
      message: "Service deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addService,
  getAllServices,
  removeService,
};
