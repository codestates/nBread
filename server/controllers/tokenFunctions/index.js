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
    console.log("---2---", auth)
    if (!auth) {
      return null;
    }

    let token = auth.split(' ')[0].split('=')[1];

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
    }
  }
};