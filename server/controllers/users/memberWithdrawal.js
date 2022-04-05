const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
console.log(req.headers.cookie)
  let token = isAuthorized(req, res);

  if (!token) {
    return res.status(204).send({ message: '권한 없음' });
  }
  
  user.destroy({
    where: {
      id: token.id
    }
  }).then( (result) => {
    if (!result) {
      return res.send({ message: '존재하지 않는 아이디입니다' });
    }
    
    res.clearCookie('nbjwt');
    res.status(200).send({ message: '회원탈퇴 성공' });
  }).catch( (err) => {
    res.status(500).send({ message: '서버 에러' });
  });
};