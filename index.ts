import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './src/config/config'
import route from './src/routes/endpoints'

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(config.port, ()=> {
    console.log(`The server is now listening at port ${config.port}`)
})

app.get("/", (req:Request, res:Response) => {
    res.send("Home Page")
})

// Routes
app.use('/', route)