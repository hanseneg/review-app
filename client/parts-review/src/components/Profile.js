import React, { useContext, useEffect } from 'react'
import ReviewForm from './ReviewForm.js'
import Review from './Review'
import { UserContext } from '../context/UserProvider.js'

//map over reviews here and display user's reviews below using './Review' template

export default function Profile(){
  const {  user: { username }, userReviews, getUserReviews, addReview } = useContext(UserContext)

  useEffect(() => {
    getUserReviews()
  }, [getUserReviews])

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Review</h3>
      <ReviewForm addReview={addReview}/>
      <h3>Your Reviews</h3>
      <div>
        {[...userReviews].map(review => {
              return (
                <Review {...review} />
              )
          })}
      </div>
    </div>
  )
}