import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function Star() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1

                return (
                    <label>
                        <input 
                            type='radio' 
                            name='rating' 
                            value={ratingValue} 
                            className='star' 
                            onClick={() => setRating(ratingValue)}
                            
                        />
                        <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                size={20}/>
                    </label>
                )
            })}
            <p>The rating is {rating}.</p>
        </div>
        
    )
}