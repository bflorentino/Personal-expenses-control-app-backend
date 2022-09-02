import mongoose from 'mongoose'
import config from '../config/config'

const connectToDb = async () => {
    
    try{
        await mongoose.connect(config.connectionString as string)
    }catch(e){
        console.log("There was a connection error")
    }

    return connectToDb
}

export default connectToDb