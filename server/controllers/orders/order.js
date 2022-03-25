const { user_content } = require('../../models');
const { isAuthorized } = require("../tokenFunctions")

module.exports = async (req, res) => {

  const token = isAuthorized(req);
  const { contentId } = req.params;

  await user_content.create({
    user_id: token.id,
    content_id: contentId
  })
  .then(_ => {
    res.status(201).send({ message: '참가 신청 성공' });
  })
  .catch(err => {
    console.log('ordersCancel error :', err);
    res.status(500).send({ message: '서버 에러' });
  })
}