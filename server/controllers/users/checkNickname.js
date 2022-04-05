const { user } = require('../../models');

module.exports = (req, res) => {

  user.findOne({
    where: {
      nickname: req.body.nickname
    }
  }).then( (result) => {
    if (!result) {
      return res.send({ message: '사용 가능한 닉네임 입니다' });
    }

    res.send({ message: '이미 사용중인 닉네임 입니다' });
  }).catch( (err) => {
    res.status(500).send({ message: '서버 에러' });
  });
};