const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

//process.env.SECRET 

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    'mongodb://localhost:27017/review-app',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    () => console.log('Connected to the DB')
  )

  app.use('/auth', require('./routes/authRouter.js'))
  app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) //req.user=payload
  app.use('/api/review', require('./routes/reviewRouter.js'))
  app.use('/api/vote', require('./routes/voteRouter.js'))

  //error handler
  app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })
  
  app.listen(8100, () => {
    console.log(`Server is running on local port 8100`)
  })