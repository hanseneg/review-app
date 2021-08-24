import React, { /* useState */ useContext, /* useEffect */ } from 'react'
import { UserContext } from '../context/UserProvider'
//import Comment from '../components/Comment'

//review itself to be mapped over and shown individually in the public page and profile page 
//in public page all reviews are shown and in profile page only user's reviews are shown 

export default function Review(props){
    const { title, description, _id, imgUrl, rating, upVotes, downVotes } = props




    //
    //logic so only person can like or dislike once
    //checks to see if id is in upvotes or downvotes or neither to allow them to vote or not

    //for toggling the comment form on and off
    //const [showCommentForm, setCommentForm] = useState(false)

    // const showCommentForm1 = () => {
    //     setCommentForm(!showCommentForm)
    // }

    //for adding a comment
    const { /* addComment, getReviewComments, */ upVote, downVote, user: {username} } = useContext(UserContext)
    // const initInput = { comment: "" } 
    // const [comment, setComment] = useState(initInput)
    // const [comments, setComments] = useState([])
    
    // function handleChange(e){
    //     const {name, value} = e.target
    //     setComment(prevComment => ({
    //     ...prevComment,
    //     [name]: value
    //     }))
    // }

    // function handleSubmit(e){
    //     e.preventDefault()
    //     addComment(comment, _id)
    //         .then(data => setComments(prevComments => [...prevComments, data]))
    //     setComment(initInput)
    // }

    // useEffect(() => {
    //     getReviewComments(_id)
    //     .then(data => setComments(data))
    //   }, [getReviewComments, _id, setComments])
    
    function upVoting(){
        upVote(_id)
    }

    function downVoting(){
        downVote(_id)
    } 

    //for displaying comments
    //map over Comment here? to show comments for each review or map over them in Comment.js component 

    return (
        <div>
            <hr className='hr'/>
            <h2>{title}</h2>
            <p>Review left by: {username}</p>
            <p>@{username} gave this part a <u><strong>{rating} star</strong></u> rating.</p>
            <p className='description'>{description}</p>
            <img src={imgUrl} alt={imgUrl} width={300}/>
            <p>Is this review helpful?</p>
            <div className='votes'>
                <button className='button' onClick={upVoting} >Yes</button>
                <p>{upVotes.length}</p>
                <button className='button' onClick={downVoting} >No</button>
                <p>{downVotes.length}</p>
            </div>

            {/* <button className='button' onClick={showCommentForm1} >Leave a Comment</button>
            {showCommentForm && (
                <form onSubmit={handleSubmit}>
                        <textarea 
                            type='text'
                            onChange={handleChange}
                            name='comment'
                            placeholder='Comment'
                            value={comment.comment}
                        />
                        <button className='button'>Submit Comment</button>
                </form>
            )}
            <div>
                {comments.map(comment => {
                    return (
                        <Comment key={comment._id} {...comment} _id={_id} /> 
                    )
                })}
            </div>   */}
        </div>
    )
}