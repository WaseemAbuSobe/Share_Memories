import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

const app = express()
app.use(bodyParser.json({ limit: "30mb" , extended:true}))
app.use(bodyParser.urlencoded({ limit: "30mb" , extended:true}))
app.use(cors())
app.use('/posts',postRoutes)
const CONNECTION_URL = 'mongodb+srv://waseem:waseem123@cluster0.hmoytlh.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000

mongoose.connect(CONNECTION_URL)
        .then( () => app.listen(PORT,() => console.log(`Server is Running in Port: ${PORT}`)))
        .catch((error) => console.log(error.message))



