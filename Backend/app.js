const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/connectDB')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser')

//load config
dotenv.config()

//passport config
require('./config/passportGoogle')(passport)

//connect Mongo
connectDB()

//assigned express into app
const app = express()
//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//logging
app.use(morgan('dev'))

//sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

//passport middleware initialized and session
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/index'))
app.use('/api/produk', require('./routes/produk'))

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
  })
})
//PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT} `))
