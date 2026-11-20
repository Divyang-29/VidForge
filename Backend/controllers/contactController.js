const { createContact, getContacts, deleteContact } = require("../models/contactModel");


const submitContact = async (req, res) => {

 try{

  const { name, email, phone, website, message } = req.body;

  if(!name || !email || !message){
   return res.status(400).json({
    message:"Name, email and message are required"
   });
  }

  const contact = await createContact(
   name,
   email,
   phone,
   website,
   message
  );

  res.json({
   message:"Contact submitted successfully",
   contact
  });

 }catch(err){

  res.status(500).json({error:err.message});

 }

};


const getAllContacts = async(req,res)=>{

 try{

  const contacts = await getContacts();

  res.json(contacts);

 }catch(err){

  res.status(500).json({error:err.message});

 }

};


const removeContact = async(req,res)=>{

 try{

  const { id } = req.params;

  await deleteContact(id);

  res.json({
   message:"Contact deleted"
  });

 }catch(err){

  res.status(500).json({error:err.message});

 }

};


module.exports = {
 submitContact,
 getAllContacts,
 removeContact
};