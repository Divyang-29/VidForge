const pool = require("../config/db");

const createTerms = async(title,content)=>{

 const result = await pool.query(
 `
 INSERT INTO terms_conditions
 (title,content)
 VALUES ($1,$2)
 RETURNING *
 `,
 [title,content]
 );

 return result.rows[0];

};


const getTerms = async()=>{

 const result = await pool.query(
  "SELECT * FROM terms_conditions ORDER BY id"
 );

 return result.rows;

};

module.exports = {
 createTerms,
 getTerms
};