const {
 addToWishlist,
 getWishlist,
 removeWishlist
} = require("../models/wishlistModel");

const addWishlist = async (req,res)=>{

 try{

  const userId = req.user.id;
  const {product_id} = req.body;

  const item = await addToWishlist(userId,product_id);

  res.json(item);

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

};


const getUserWishlist = async (req,res)=>{

 try{

  const userId = req.user.id;

  const items = await getWishlist(userId);

  const total = items.reduce(
   (sum,item)=>sum + item.price,
   0
  );

  res.json({
   items,
   total
  });

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

};


const deleteWishlist = async (req,res)=>{

 try{

  const userId = req.user.id;
  const {id} = req.params;

  await removeWishlist(userId,id);

  res.json({
   message:"Removed from wishlist"
  });

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

};

module.exports = {
 addWishlist,
 getUserWishlist,
 deleteWishlist
};