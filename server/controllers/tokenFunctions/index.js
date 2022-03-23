const { sign } = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('nbjwt', accessToken);
  }
};