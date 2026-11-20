const pool = require("../config/db");

const createPlan = async(data)=>{

 const result = await pool.query(
 `
 INSERT INTO pricing
 (plan_name,price,duration,image,features)
 VALUES ($1,$2,$3,$4,$5)
 RETURNING *
 `,
 [
  data.plan_name,
  data.price,
  data.duration,
  data.image,
  data.features
 ]
 );

 return result.rows[0];

};


const getPlans = async()=>{

 const result = await pool.query(
  "SELECT * FROM pricing ORDER BY created_at DESC"
 );

 return result.rows;

};


const deletePlan = async(id)=>{

 await pool.query(
  "DELETE FROM pricing WHERE id=$1",
  [id]
 );

};

module.exports = {
 createPlan,
 getPlans,
 deletePlan
};