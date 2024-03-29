const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require('./config/mongoose.config')

const Routes = require('./routes/todos.route.js')
Routes(app)

const port = 8000
const server = app.listen(port, () => console.log(`Listening on port: ${port}`))
const io = require('socket.io')(server, {cors: true})