const pool = require("../config/db");

const createReview = async(data)=>{

 const result = await pool.query(
 `
 INSERT INTO reviews
 (review,name,position,rating,image)
 VALUES ($1,$2,$3,$4,$5)
 RETURNING *
 `,
 [
  data.review,
  data.name,
  data.position,
  data.rating,
  data.image
 ]
 );

 return result.rows[0];

};


const getReviews = async()=>{

 const result = await pool.query(
  "SELECT * FROM reviews ORDER BY created_at DESC"
 );

 return result.rows;

};


const deleteReview = async(id)=>{

 await pool.query(
  "DELETE FROM reviews WHERE id=$1",
  [id]
 );

};

module.exports = {
 createReview,
 getReviews,
 deleteReview
};