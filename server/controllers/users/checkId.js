const { user } = require('../../models');

module.exports = (req, res) => {

  user.findOne({
    where: {
      username: req.body.username
    }
  }).then( (result) => {
    if (!result) {
      return res.send({ message: '사용 가능한 아이디 입니다' });
    }

    res.send({ message: '이미 사용중인 아이디 입니다' });
  }).catch( (err) => {
    res.status(500).send({ message: '서버 에러' });
  });
};