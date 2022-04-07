const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  
  let token = isAuthorized(req, res);

  if (!token) {
    return res.status(200).send({ success: false, message: '권한 없음' });
  } else {
    user.findOne({
      where: {
        id: token.id
      }
    })
    .then(result => {
      if (!result) {
        res.status(200).send({ success: false, message: '존재하지 않는 아이디' });
      } else {
        res.status(200).send({ success: true, data: result, message: '권한 부여 완료' })
      }
    })
    .catch(err => {
      res.status(500).send({})
    })
  }
};
