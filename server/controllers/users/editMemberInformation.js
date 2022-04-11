const { user } = require('../../models');
const { isAuthorized, generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {

  let token = isAuthorized(req, res);

  if (!token) {
    return res.status(204).send({ message: '권한 없음' });
  }

  const { nickname, password, address, phone_number } = req.body

  user.update({
    nickname: nickname,
    password: password,
    // picture: req.body.picture,
    address: address,
    phone_number: phone_number
  }, {
    where: {
      id: token.id
    }
  }).then( (result) => {
    if (!result) {
      return res.send({ message: '존재하지 않는 아이디입니다' });
    }

    res.clearCookie('nbjwt')
    token.nickname = nickname;
    token.password = password;
    token.address = address;
    token.phone_number = phone_number;
    const accessToken = generateAccessToken(token)
    sendAccessToken(res, accessToken)

    res.status(200).send({ data: token, message: '회원정보 수정 성공' });
  }).catch( (err) => {
    res.status(500).send({ message: '서버 에러' });
  });
};