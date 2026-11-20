const pool = require("../config/db");

const createPrivacy = async(title,content)=>{

 const result = await pool.query(
 `
 INSERT INTO privacy_policy
 (title,content)
 VALUES ($1,$2)
 RETURNING *
 `,
 [title,content]
 );

 return result.rows[0];

};


const getPrivacy = async()=>{

 const result = await pool.query(
  "SELECT * FROM privacy_policy ORDER BY id"
 );

 return result.rows;

};

module.exports = {
 createPrivacy,
 getPrivacy
};