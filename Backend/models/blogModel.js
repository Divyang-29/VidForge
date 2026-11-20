const pool = require("../config/db");

const createBlog = async (data) => {
  const result = await pool.query(
    `
 INSERT INTO blogs
 (
  title,
  primary_image,
  big_image,
  image1,
  image2,
  description,
  quote,
  author,
  minutes_to_read,
  section_title,
  section_content,
  tags
 )
 VALUES
 ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
 RETURNING *
 `,
    [
      data.title,
      data.primary_image,
      data.big_image,
      data.image1,
      data.image2,
      data.description,
      data.quote,
      data.author,
      data.minutes_to_read,
      data.section_title,
      data.section_content,
      data.tags,
    ],
  );

  return result.rows[0];
};

const getBlogs = async () => {
  const result = await pool.query(
    "SELECT * FROM blogs ORDER BY created_at DESC",
  );

  return result.rows;
};

const getBlogById = async (id) => {
  const blog = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);

  const comments = await pool.query(
    "SELECT * FROM blog_comments WHERE blog_id=$1 ORDER BY created_at DESC",
    [id],
  );

  return {
    blog: blog.rows[0],
    comments: comments.rows,
  };
};

const addComment = async (blogId, name, email, comment) => {
  const result = await pool.query(
    `
 INSERT INTO blog_comments
 (blog_id,name,email,comment)
 VALUES ($1,$2,$3,$4)
 RETURNING *
 `,
    [blogId, name, email, comment],
  );

  return result.rows[0];
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  addComment,
};
