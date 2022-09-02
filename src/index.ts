import express from 'express'
import cors from 'cors'
import config from './config/config'
import route from './routes/endpoints'

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(config.port, ()=> {
    console.log(`The server is now listening at port ${config.port}`)
})

// Routes
app.use('/', route)