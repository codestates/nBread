const { user } = require('../../models');

module.exports = (req, res) => {
  
  user.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: {
      password: req.body.password,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      nickname: req.body.nickname
    }
  }).then( ([result, created]) => {
    if (!created) {
      return res.send({ message: '이미 존재하는 아이디입니다' });
    }

    res.status(201).send({ message: '회원가입 성공' });
  }).catch( (err) => {
    res.status(500).send({ message: '서버 에러' });
  });
};
