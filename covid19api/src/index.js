const express = require('express');
const mailRouter = require('./routers/mail');
const app = express()
const port = process.env.PORT || 3000

var cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(mailRouter)

app.listen(port, () => {
    console.log('Server is up on port '+port)
})