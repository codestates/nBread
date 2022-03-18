const express = require('express')
const app = express()

app.use('/', (req, res) => {
  res.send('서버 진행 중')
})

app.listen(4000, (req, res) => {
  console.log('server running')
})