const app = require('./app')
const db = require('./database')


const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`✅ App running on port ${port}...`)
})