const { createPlan, getPlans, deletePlan } = require("../models/pricingModel");

const addPlan = async (req, res) => {
  try {
    const { plan_name, price, duration, features } = req.body;

    const image = req.file ? req.file.filename : null;

    const plan = await createPlan({
      plan_name,
      price,
      duration,
      image,
      features: features.split(","),
    });

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await getPlans();

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removePlan = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePlan(id);

    res.json({
      message: "Plan deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPlan,
  getAllPlans,
  removePlan,
};
