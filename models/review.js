const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    upVotes: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    downVotes: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    imgUrl: {
        type: String,
        required: true
    },
    //one to many
    //references reviews to user
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema)