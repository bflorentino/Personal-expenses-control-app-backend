import dotenv from 'dotenv'

if(process.env.NODE_ENV !== "production")
    dotenv.config()

const variables = {
    port: process.env.PORT,
    connectionString : process.env.CONNECTION_STRING
}

export default variables