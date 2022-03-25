const { user_content } = require('../../models');
const { Op } = require('sequelize');
const { isAuthorized } = require("../tokenFunctions")

module.exports = async (req, res) => {

  const token = isAuthorized(req);
  const { contentId } = req.params;

  await user_content.destroy({
    where: {
      [Op.and]: {
        user_id: token.id,
        content_id: contentId
      }
    }
  })
  .then(_ => {
    res.status(200).send({ message: '참가 취소 성공' });
  })
  .catch(err => {
    console.log('ordersCancel error :', err);
    res.status(500).send({ message: '서버 에러' });
  })
}