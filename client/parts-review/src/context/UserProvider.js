import React, {useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        userReviews: [],
        errMsg: ''
    }

    const [userState, setUserState] = useState(initState)
    const [allReviews, setAllReviews] = useState([])
    //moved to Review.js
    //const [reviewComments, setReviewComments] = useState([])

    function signup(credentials){
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getAllReviews()
                getUserReviews()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            userReviews: []
        })
    }
    function handleAuthErr(errMsg){
        setUserState(prevState => ({
          ...prevState,
          errMsg
        }))
      }
    
      function resetAuthError(){
        setUserState(prevState => ({
          ...prevState,
          errMsg: ''
        }))
      }    

    function getAllReviews(){
        userAxios.get('/api/review')
            .then(res => setAllReviews(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserReviews(){
        userAxios.get('/api/review/user')
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    userReviews: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addReview(newReview){
        userAxios.post('/api/review', newReview)
            .then(res => {
                setAllReviews(prevReviews => [...prevReviews, res.data])
                setUserState(prevState => ({
                    ...prevState,
                    userReviews: [...prevState.userReviews, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getReviewComments(reviewId) {
      return userAxios.get(`/api/comment/review/${reviewId}`)
            //.then(res => setReviewComments(prevComment => [...prevComment, ...res.data]))
            //.then(res => setReviewComments(res.data))
            .then(res => res.data)
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(newComment, reviewId) {
       return userAxios.post(`/api/comment/${reviewId}`, newComment)
            //.then(res => setReviewComments(prevComment => [...prevComment, ...res.data]))
            .then(res => res.data)
            .catch(err => console.log(err.response.data.errMsg))
    }

    //fix this to show votes in profile page without having to refresh

    //logic to allow votes to show up correctly in profile page 
    //logic=check user reviews for review ids like below use if else statement?

    function upVote(reviewId) {
        userAxios.put(`/api/vote/up/review/${reviewId}`)
            .then(res => setAllReviews(prevReviews => prevReviews.map(review => review._id === reviewId ? res.data : review)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function downVote(reviewId) {
        userAxios.put(`/api/vote/down/review/${reviewId}`)
            .then(res => setAllReviews(prevReviews => prevReviews.map(review => review._id === reviewId ? res.data : review)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup, 
                login,
                logout,
                getAllReviews: React.useCallback(getAllReviews, []),
                allReviews,
                getUserReviews: React.useCallback(getUserReviews, []),
                addReview,
                //reviewComments,
                getReviewComments: React.useCallback(getReviewComments, []),
                addComment,
                resetAuthError,
                upVote,
                downVote
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}