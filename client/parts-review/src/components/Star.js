import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function Star(props) {
    
    //const [starRating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const rating = props.rating
    const handleRating = props.handleRating

//pass down inputs.rating as a prop to Star and set that as the value, 
//so that every time the rating changes, the rating property of inputs will update

//You'd have to replace the value as inputs.rating, 
//and also set the state of inputs instead of ratingValue. 
//So you're not actually using ratingValue anymore

//pass a function from ReviewForm to Star that calls setInputs, 
//and setInputs will set the rating property to ratingValue

    return (
        <div>
            {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1
                
                return (
                    <label key={i}>
                        <input 
                            type='radio' 
                            name='rating' 
                            value={ratingValue} 
                            className='star' 
                            onClick={() => {
                                //setRating(ratingValue)
                                handleRating(ratingValue)
                                }
                            }
                        />
                        <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                size={20}
                        />
                    </label>
                )
            })}
            <p>You are leaving a {rating} star rating.</p>
        </div>
    )
}


// vscode://vscode.github-authentication/did-authenticate?windowid=1&code=e0ae6c26852aa5e79029&state=a04b405a-378f-4fd4-850f-052882437681 