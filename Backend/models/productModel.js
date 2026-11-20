const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const createProduct = async(data)=>{

 const productId = uuidv4();
 const sku = "SKU-" + Date.now();

 const expectedDelivery =
  data.stock > 0
   ? new Date(Date.now()+3*24*60*60*1000)
   : new Date(Date.now()+10*24*60*60*1000);

 const query = `
 INSERT INTO products
 (id,category,sub_category,title,description,price,discounted_price,
 sku,primary_image,images,tags,additional_info,stock,expected_delivery_date)

 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
 RETURNING *
 `;

 const values=[
  productId,
  data.category,
  data.sub_category,
  data.title,
  data.description,
  data.price,
  data.discounted_price,
  sku,
  data.primary_image,
  data.images,
  data.tags,
  data.additional_info,
  data.stock,
  expectedDelivery
 ];

 const result = await pool.query(query,values);
 return result.rows[0];

};

module.exports={createProduct};