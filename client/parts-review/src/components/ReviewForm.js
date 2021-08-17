import React, { useState, useContext } from 'react'
//import { FaStar } from 'react-icons/fa'
import { UserContext } from '../context/UserProvider'
import Star from './Star'

//form to submit a new review

export default function ReviewForm(){
  
  const { addReview } = useContext(UserContext)
  
  const initInputs = { title: "", description: "", imgUrl: "", rating: 0 }
  const [inputs, setInputs] = useState(initInputs)

  function handleRating(rating){
    setInputs(prevInputs => ({
      ...prevInputs, 
      rating: rating
    }))
  }

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
          placeholder="Part brand name and part name"
          />
        <textarea 
          type="text" 
          name="description" 
          value={inputs.description} 
          onChange={handleChange} 
          placeholder="Description of the part and the car it is for"
          />
        <input 
          type='text'
          name='imgUrl'
          value={inputs.imgUrl}
          onChange={handleChange}
          placeholder='Image link of the part'
          />
        <Star 
        rating={inputs.rating}
        handleRating={handleRating}
          />
        <button className='button'>Add Review</button>
      </form>
    )
}