const express = require('express')
const reviewRouter = express.Router()
const Review = require('../models/review.js')

//get all reviews
// Get all reviews
reviewRouter.get("/", (req, res, next) => {
    Review.find((err, reviews) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(reviews)
    })
  })
  
  // Get all reviews by user id
  reviewRouter.get("/user", (req, res, next) => {
    Review.find({ user: req.user._id }, (err, reviews) => { //finds reviews that have a specific user's id  -  get err, and reviews
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(reviews)
    })
  })
  
  // Get one review
  reviewRouter.get('/:reviewId', (req, res, next) => {
      Review.findOne({ _id: req.params.reviewId }, (err, review) => {
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(200).send(review)
      })
  })
  
  //..req.body, upVotes: [], 
  // Add new review
  reviewRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newReview = new Review(req.body)
    newReview.save((err, savedReview) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedReview)
    })
  })
  
  // Delete review
  reviewRouter.delete("/:reviewId", (req, res, next) => {
    Review.findOneAndDelete(
      { _id: req.params.reviewId, user: req.user._id }, //only user that made this review can delete
      (err, deletedReview) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted review: ${deletedReview.title}.`)
      }
    )
  })
  
  // Update review
  reviewRouter.put("/:reviewId", (req, res, next) => {
    Review.findOneAndUpdate(
      { _id: req.params.reviewId, user: req.user._id }, //only user that made this review can delete
      req.body,
      { new: true },
      (err, updatedReview) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedReview)
      }
    )
  })
  
  module.exports = reviewRouter