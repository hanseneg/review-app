import React, { useContext, useEffect}from 'react'
import { UserContext } from '../context/UserProvider'
import Review from './Review.js'

//map over reviews here and display all of them below using './Review' template

export default function Public(){
  const { user: {username}, allReviews, getAllReviews } = useContext(UserContext)

  useEffect(() => {
    getAllReviews()
  }, [getAllReviews])

  return (
    <div className="public">
        <h1>Public Page</h1>
        <h3>Hello @{username}</h3>
        <div>
            {[...allReviews].map(review => {
              return (
                <Review {...review} />
              )
            })}
        </div>
    </div>
  )
}