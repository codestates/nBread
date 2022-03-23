module.exports = (req, res) => {
  res.clearCookie('nbjwt');
  res.status(200).send({ message: '로그아웃 성공' });
}