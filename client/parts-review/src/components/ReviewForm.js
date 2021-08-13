import React, { useState, useContext } from 'react'
//import { FaStar } from 'react-icons/fa'
import { UserContext } from '../context/UserProvider'
import Star from './Star'

//form to submit a new review

export default function ReviewForm(){
  //const { _id } = props
  const { addReview } = useContext(UserContext)
  
  const initInputs = { title: "", description: "", imgUrl: "", rating: 0 }
  const [inputs, setInputs] = useState(initInputs)

  
//pass down inputs.rating as a prop to Star and set that as the value, 
//so that every time the rating changes, the rating property of inputs will update

//pass a function from ReviewForm to Star that calls setInputs, 
//and setInputs will set the rating property to ratingValue

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
        placeholder="Title"
        />
      <textarea 
        type="text" 
        name="description" 
        value={inputs.description} 
        onChange={handleChange} 
        placeholder="Description"
        />
      <input 
        type='text'
        name='imgUrl'
        value={inputs.imgUrl}
        onChange={handleChange}
        placeholder='Image Url'
        />
      <Star 
      rating={inputs.rating}
      handleRating={handleRating}
        />
      <button className='button'>Add Review</button>
      <p>The rating is {inputs.rating}.</p>
    </form>
  )
}





// function setRating(rating){
  //     setInputs({rating: rating})
  // }