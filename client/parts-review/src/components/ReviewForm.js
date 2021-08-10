import React, { useState, useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { UserContext } from '../context/UserProvider'
//import Star from './Star'

//form to submit a new review

export default function ReviewForm(props){
  //const { _id } = props
  const { addReview } = useContext(UserContext)
  
  const initInputs = { title: "", description: "", imgUrl: "", rating: null }
  const [inputs, setInputs] = useState(initInputs)

  //const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

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
      <input 
        type='text'
        name='imgUrl'
        value={inputs.imgUrl}
        onChange={handleChange}
        placeholder='Image Url'/>

      <div>
          {[...Array(5)].map((star, i) => {
              const rating = i + 1

              return (
                  <label>
                      <input 
                          type='radio' 
                          name='rating' 
                          value={inputs.rating} 
                          className='star' 
                          onClick={() => setInputs(rating)}
                      />
                      <FaStar 
                          color={rating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                          onMouseEnter={() => setHover(rating)}
                          onMouseLeave={() => setHover(null)}
                          size={20}/>
                  </label>
              )
          })}
          <p>The rating is {/* {rating} */}.</p>
      </div>


      <button className='button'>Add Review</button>
    </form>
  )
}