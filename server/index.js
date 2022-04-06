const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
const path = require('path');
const app = express();
const router = express.Router();

app.all('*', (req, res, next) => {
  let protocol = req.headers['x-forwarded-proto'] || req.protocol;
  if (protocol === 'https') next()
  else {
    let from = `${protocol}://${req.hostname}${req.url}`;
    let to = `https://${req.hostname}${req.url}`;

    console.log(`[${req.method}]: ${from} -> ${to}`)
    res.redirect(to)
  };
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/privkey.pem', 'utf-8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/cert.pem', 'utf-8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.nbread.kro.kr/chain.pem', 'utf-8');

const credentials = {
  key : privateKey,
  cert : certificate,
  ca : ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const io = require('socket.io')(httpsServer, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  }, 
  pingInterval: 999999999,

});

app.use(express.json());
// app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://www.nbread.kro.kr', 'https://www.nbread.kro.kr'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);





// 배포 시 주석 처리 풀어주세요!!

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});





app.use('/users', controllers.editPicture);
app.get('/users', controllers.userBoard);
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
app.post('/orders/:contentId', controllers.order);
app.delete('/orders/:contentId', controllers.cancelOrder);
app.post('/users/checkId', controllers.checkId);
app.post('/users/checkNickname', controllers.checkNickname);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// io.on('connection', (socket) => {
//   console.log("userconnected", socket.id)

//   socket.on('onJoin',({ roomName: room, userName: user }) => {
//     socket.join(room);
//     io.to(room).emit("onConnect", `${user} 님이 입장했습니다.`)

//     socket.on('onSend',(message) => {
//       console.log('--------2---------', message)
//       io.to(room).emit('onReceive', message)
//     });

//     socket.on('disconnect', () => {
//       socket.leave(room);
//       io.to(room).emit('onDisconnect', `${user} 님이 퇴장하셨습니다.`);
//     });
//   });
// });

let users = [];
let rooms = [];
let roomChatLog = [];

io.on('connection', (socket) => {

  console.log('------------socket.id---------', socket.id)
  

  socket.on('joinServer', ({ nickname, roomId }) => {
    console.log('------------joinServer----------')
    let user = {
      id: socket.id,
      nickname,
      userRoom: []
    };
    let check = users.find((user) => user.nickname === nickname);

    if (!check) {
      users.push(user);
    }
    
    users.forEach((el) => {
      
      if (el.nickname === nickname) {
       
        let userRoom = el.userRoom;
        let userNickName = el.nickname;
      
        io.emit('myRoomList', ({ userRoom, userNickName }));
      }
    });

    if (roomId) {
     
      let check = roomChatLog.find((el) => el[0] === roomId);

      if (check) {
      
        let slice = check.slice(1);
        
        io.emit('roomChatLog', (slice));
      }
    }
  });

  socket.on('createRoom', ({ id, roomName, nickname }) => {

    let room = {
      id,
      roomName,
      roomUsers: [nickname]
    };
    let check = rooms.find((room) => room.id === id);
    
    if (!check) {
      rooms.push(room);
      users.forEach((el) => {
        if (el.nickname === nickname) {
          let userRoomData = {
            roomName,
            id
          }
          el.userRoom.push(userRoomData);
        }
      });
    }
  });

  socket.on('sendRoomMessage', (roomMessageInfo) => {

    let check = roomChatLog.find((el) => el[0] === roomMessageInfo.roomId);

    if (!check) {
      roomChatLog.push([roomMessageInfo.roomId]);
     
      let recheck = roomChatLog.find((el) => el[0] === roomMessageInfo.roomId);
     
      recheck.push({ nickname: roomMessageInfo.nickname, message: roomMessageInfo.message })
      
      let slice = recheck.slice(1);
      
      io.emit('roomChatLog', (slice));
    } else {

      check.push({ nickname: roomMessageInfo.nickname, message: roomMessageInfo.message });

      let slice = check.slice(1);
      
      io.emit('roomChatLog', (slice));
    }
  });

  socket.on('joinRoom', ({ id, nickname, roomName }) => {

    let checkRoomId = rooms.find((el) => el.id === id);
    
    if (checkRoomId) {

      let checkRoomUsers = checkRoomId.roomUsers.find((el) => el === nickname);

      if (!checkRoomUsers) {
        checkRoomId.roomUsers.push(nickname);
        users.forEach((el) => {
          if (el.nickname === nickname) {
            let userRoomData = {
              roomName,
              id
            };
            el.userRoom.push(userRoomData);
          }
        });
      }
    }
   
  });

  socket.on('disconnect', () => {
    console.log('-----------disconnect-----------')
  });
});

httpServer.listen(80, () => {
  console.log(`HTTP Server running on port 80`)
});
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443')
});

// const express = require('express');
// const app = express();

// app.use('/', (req, res) => {
//   res.send('서버 진행 중')
// });

// app.listen(4000, (req, res) => {
//   console.log('server running')
// });
