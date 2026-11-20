import { useEffect, useState } from "react"
import axios from "axios"
import "./AdminTestimonials.css"

export default function AdminTestimonials(){

 const [testimonials,setTestimonials] = useState([])
 const [testimonial,setTestimonial] = useState("")
 const [writer,setWriter] = useState("")
 const [position,setPosition] = useState("")

 const token = localStorage.getItem("token")

 const fetchTestimonials = async()=>{

  const res = await axios.get("http://localhost:8080/testimonials")

  setTestimonials(res.data)

 }

 useEffect(()=>{
  fetchTestimonials()
 },[])

 const addTestimonial = async(e)=>{

  e.preventDefault()

  await axios.post(
   "http://localhost:8080/testimonials",
   {
    testimonial,
    writer,
    position
   },
   {
    headers:{
     Authorization:`Bearer ${token}`
    }
   }
  )

  setTestimonial("")
  setWriter("")
  setPosition("")

  fetchTestimonials()

 }

 const deleteTestimonial = async(id)=>{

  await axios.delete(
   `http://localhost:8080/testimonials/${id}`,
   {
    headers:{
     Authorization:`Bearer ${token}`
    }
   }
  )

  fetchTestimonials()

 }

 return(

 <div className="admin-testimonials">

  <h2>Testimonials</h2>

  {/* form */}

  <form onSubmit={addTestimonial} className="testimonial-form">

   <textarea
    placeholder="Testimonial"
    value={testimonial}
    onChange={(e)=>setTestimonial(e.target.value)}
   />

   <input
    placeholder="Writer"
    value={writer}
    onChange={(e)=>setWriter(e.target.value)}
   />

   <input
    placeholder="Position"
    value={position}
    onChange={(e)=>setPosition(e.target.value)}
   />

   <button>Add Testimonial</button>

  </form>

  {/* list */}

  <div className="testimonial-list">

   {testimonials.map(item=>(
    <div key={item.id} className="testimonial-card">

     <p className="quote">"{item.testimonial}"</p>

     <h4>{item.writer}</h4>

     <span>{item.position}</span>

     <button
      className="delete-btn"
      onClick={()=>deleteTestimonial(item.id)}
     >
      Delete
     </button>

    </div>
   ))}

  </div>

 </div>

 )

}