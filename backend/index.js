const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const AuthRoute = require('./Routes/AuthRoute');
const BlogRoutes = require('./Routes/BlogRoute');
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use('/auth' , AuthRoute)
app.use('/blog' , BlogRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})