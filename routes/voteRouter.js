const express = require("express")
const voteRouter = express.Router()
const Review = require('../models/review.js')

voteRouter.put('/up/review/:reviewId', (req, res, next) => {
    Review.findByIdAndUpdate(
        { _id: req.params.reviewId },
        { 
            $addToSet: { upVotes: req.user._id },
            $pull: { downVotes: req.user._id }
        },
        { new: true },
        (err, upVotedReview) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedReview)
        }
    )
})

voteRouter.put('/down/review/:reviewId', (req, res, next) => {
    Review.findByIdAndUpdate(
        { _id: req.params.reviewId },
        { 
            $addToSet: { downVotes: req.user._id },
            $pull: { upVotes: req.user._id }
        },
        { new: true },
        (err, downVotedReview) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedReview)
        }
    )
})

module.exports = voteRouter