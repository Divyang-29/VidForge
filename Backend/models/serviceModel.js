const pool = require("../config/db");

const createService = async(data)=>{

 const result = await pool.query(
 `
 INSERT INTO services
 (title,description,primary_image,bullets,image2,heading,heading_desc)
 VALUES ($1,$2,$3,$4,$5,$6,$7)
 RETURNING *
 `,
 [
  data.title,
  data.description,
  data.primary_image,
  data.bullets,
  data.image2,
  data.heading,
  data.heading_desc
 ]
 );

 return result.rows[0];

};


const getServices = async()=>{

 const result = await pool.query(
  "SELECT * FROM services ORDER BY created_at DESC"
 );

 return result.rows;

};


const deleteService = async(id)=>{

 await pool.query(
  "DELETE FROM services WHERE id=$1",
  [id]
 );

};

module.exports = {
 createService,
 getServices,
 deleteService
};