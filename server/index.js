const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://wwww.nbread.kro.kr'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

// 배포 시 주석 처리 풀어주세요!!
// app.all('*', (req, res, next) => {
//   let protocol = req.headers['x-forwarded-proto'] || req.protocol;
//   if (protocol === 'https') next()
//   else {
//     let from = `${protocol}://${req.hostname}${req.url}`;
//     let to = `https://${req.hostname}${req.url}`;

//     console.log(`[${req.method}]: ${from} -> ${to}`)
//     res.redirect(to)
//   };
// });

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/privkey.pem', 'utf-8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/cert.pem', 'utf-8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/chain.pem', 'utf-8');

// const credentials = {
//   key : privateKey,
//   cert : certificate,
//   ca : ca
// };

app.post('/users/signup', controllers.signup);
app.post('/users/login', controllers.login);
app.post('/users/logout', controllers.logout);
app.delete('/users', controllers.memberWithdrawal);
app.patch('/users', controllers.editMemberInformation);
app.post('/contents', controllers.boardPost);
app.delete('/contents/:contentId', controllers.boardDelete);
app.patch('/contents/:contentId', controllers.boardPatch);
app.get('/contents/:contentId', controllers.boardDetailGet);
app.get('/contents', controllers.boardGet);
app.post('/order/:contentId', controllers.order);
app.delete('/order/:contentId', controllers.cancelOrder);

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log(`HTTP Server running on port 80`)
});
// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443')
// });

// const express = require('express');
// const app = express();

// app.use('/', (req, res) => {
//   res.send('서버 진행 중')
// });

// app.listen(4000, (req, res) => {
//   console.log('server running')
// });