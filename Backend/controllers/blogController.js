const {
  createBlog,
  getBlogs,
  getBlogById,
  addComment,
} = require("../models/blogModel");

const createNewBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      quote,
      author,
      minutes_to_read,
      section_title,
      section_content,
      tags,
    } = req.body;

    const primaryImage = req.files["primary_image"]
      ? req.files["primary_image"][0].filename
      : null;

    const bigImage = req.files["big_image"]
      ? req.files["big_image"][0].filename
      : null;

    const image1 = req.files["image1"] ? req.files["image1"][0].filename : null;

    const image2 = req.files["image2"] ? req.files["image2"][0].filename : null;

    const blog = await createBlog({
      title,
      primary_image: primaryImage,
      big_image: bigImage,
      image1,
      image2,
      description,
      quote,
      author,
      minutes_to_read,
      section_title,
      section_content,
      tags: tags ? tags.split(",") : [],
    });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getBlogs();

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await getBlogById(id);

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postComment = async (req, res) => {
  try {
    const { blog_id, name, email, comment } = req.body;

    const newComment = await addComment(blog_id, name, email, comment);

    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  postComment,
};
