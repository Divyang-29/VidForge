const pool = require("../config/db");

const createMember = async(data)=>{

 const result = await pool.query(
 `
 INSERT INTO members
 (name,position,image)
 VALUES ($1,$2,$3)
 RETURNING *
 `,
 [
  data.name,
  data.position,
  data.image
 ]
 );

 return result.rows[0];

};


const getMembers = async()=>{

 const result = await pool.query(
  "SELECT * FROM members ORDER BY created_at DESC"
 );

 return result.rows;

};


const deleteMember = async(id)=>{

 await pool.query(
  "DELETE FROM members WHERE id=$1",
  [id]
 );

};

module.exports = {
 createMember,
 getMembers,
 deleteMember
};