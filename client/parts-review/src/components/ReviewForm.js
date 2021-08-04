import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

//form to submit a new review

export default function ReviewForm(props){
  //const { _id } = props
  const { addReview } = useContext(UserContext)
  
  const initInputs = { title: "", description: "", imgUrl: "" }
  const [inputs, setInputs] = useState(initInputs)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addReview(inputs)
    setInputs(initInputs)
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={inputs.title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <textarea 
        type="text" 
        name="description" 
        value={inputs.description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <button className='button'>Add Review</button>
    </form>
  )
}