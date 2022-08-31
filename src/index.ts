import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.listen(3000, ()=> {
    console.log("The server is now listening at port 3000")
})