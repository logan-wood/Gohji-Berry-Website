const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

//connect to database
const db = require('./database.js')

db.connect((err) => {
    if(err) {
        console.log('could not connect to database\n')
        throw err
    }
})

//cors
const cors = require('cors')
app.use(cors())

//init router
const router = require('./routes/router')
app.use(router)

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(
    'Server listening on ' + process.env.SERVER_DOMAIN + '\n'
  )
})

//404
app.use((req, res) => {
  res.status(404).render('404')
})