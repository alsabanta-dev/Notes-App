require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')

const app = express()
app.use(cors())

const schema = require('./schemas/schema')

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'  
}))

module.exports = app