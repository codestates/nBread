const { user } = require('../../models');
const { isAuthorized, generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/build/img/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage });

// let upload = multer({
//   dest: "uploads/"
// })

router.post('/picture', upload.single("file"), function(req, res, next) {
  let token = isAuthorized(req, res);

  if (!token) {
    return res.status(204).send({ message: '권한 없음' });
  }

  const picturePath = res.req.file.path.slice(16);

  user.update({
    picture: picturePath
  }, {
    where: {
      id: token.id
    }
  })
  .then(result => {

    res.clearCookie('nbjwt')
    token.picture = picturePath    
    const accessToken = generateAccessToken(token)
    sendAccessToken(res, accessToken)
    res.status(200).send({ success: true, data: token, filePath: picturePath, fileName: res.req.file.filename, message: '이미지 업로드 완료' })
  })
  .catch(err => {
    console.log('editPicture3 error: ', err);
    res.status(500).send({ message: '서버 에러' });
  })
})

router.patch('/picture', function(req, res, next) {
  let token = isAuthorized(req, res);

  if (!token) {
    return res.status(204).send({ message: '권한 없음' });
  }

  user.update({
    picture: null
  }, {
    where: {
      id: token.id
    }
  })
  .then(result => {
    res.clearCookie('nbjwt')
    token.picture = null
    const accessToken = generateAccessToken(token)
    sendAccessToken(res, accessToken)
    res.status(200).send({ success: true, data: token, message: '이미지 삭제 완료' })
  })
})

module.exports = router;
// module.exports = (req, res) => {
//   let token = isAuthorized(req, res);

//   if (!token) {
//     return res.status(204).send({ message: '권한 없음' });
//   }
//   if (!req.body) {
//     user.update({

//       picture: ""
//     }, {
//       where: {
//         id: token.id
//       }
//     })
//     .then(result => {
//       console.log('dfeifeifjie')
//       return res.send({ message: "프로필 사진 초기화 완료" })
//     })
//     .catch(err => {
//       console.log('editPicture1 error: ', err);
//       res.status(500).send({ message: '서버 에러' })
//     })
//   } else {


//     router.post('/picture', (req, res) => {
//     console.log("good?")
//     upload(req, res, (err) => {
//       console.log("123456789",req)
//       if (err) {
//         console.log('editPicture2 error: ', err);
//         return res.status(500).send({ message: '서버 에러' });
//       } else {
//         return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        // user.update({
        //   picture: res.req.file.filename
        // }, {
        //   where: {
        //     id: token.id
        //   }
        // })
        // .then(result => {
        //   res.status(200).send({ filePath: res.req.file.path, fileName: res.req.file.filename, message: '이미지 업로드 완료' })
        // })
        // .catch(err => {
        //   console.log('editPicture3 error: ', err);
        //   res.status(500).send({ message: '서버 에러' });
        // })
  //     }
  //   })
  //   })
  // }
  // user.update({
  //   nickname: req.body.nickname,
  //   password: req.body.password,
  //   // picture: req.body.picture,
  //   address: req.body.address,
  //   phone_number: req.body.phone_number
  // }, {
  //   where: {
  //     id: token.id
  //   }
  // }).then( (result) => {
  //   if (!result) {
  //     return res.send({ message: '존재하지 않는 아이디입니다' });
  //   }

  //   res.status(200).send({ message: '회원정보 수정 성공' });
  // }).catch( (err) => {
  //   res.status(500).send({ message: '서버 에러' });
  // });
// };