const { sign, verify } = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('nbjwt', accessToken);
  },
  isAuthorized: (req, res) => {

    let auth = req.headers.cookie;

    if (!auth) {
      return res.send({ message: '로그인이 필요한 서비스입니다' });
    }

    let token = auth.split(' ')[0].split('=')[1];

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
    }
  }
};