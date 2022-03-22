const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')

const app = express()

app.all('*', (req, res, next) => {
  let protocol = req.headers['x-forwarded-proto'] || req.protocol
  if (protocol === 'https') next()
  else {
    let from = `${protocol}://${req.hostname}${req.url}`
    let to = `https://${req.hostname}${req.url}`

    console.log(`[${req.method}]: ${from} -> ${to}`)
    res.redirect(to)
  }
})

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/privkey.pem', 'uft-8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/cert.pem', 'uft-8')
const ca = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/chain.pem', 'uft-8')

const credentials = {
  key : privateKey,
  cert : certificate,
  ca : ca
}

app.use((req, res) => {
  res.send('서버 진행 중!')
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80, () => {
  console.log(`HTTP Server running on port 80`)
})
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443')
})



// const express = require('express')
// const app = express()

// app.use('/', (req, res) => {
//   res.send('서버 진행 중')
// })

// app.listen(4000, (req, res) => {
//   console.log('server running')
// })
