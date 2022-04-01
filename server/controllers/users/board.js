const { recruitment_content, user_content } = require('../../models');
const { Sequelize } = require('sequelize')
const { isAuthorized } = require('../tokenFunctions')


module.exports = (req, res) => {

  const token = isAuthorized(req, res);
  if (!token) {
    return res.status(204).send({ message: '권한 없음' })
  }
  
  let recruitmentArr = [];
  let contentsIdArr = [];
  let recruitment = [];
  let application = [];

  user_content.findAll({
    where: {
      user_id: token.id
    },
    attributes: ['recruitment_content_id'],
    order: [['recruitment_content_id', 'DESC']]
  })
  .then(result => {
    for (data of result) {
      contentsIdArr.push(data.dataValues.recruitment_content_id)
    }

    user_content.findAll({
      group: ['recruitment_content_id'],
      order: [['recruitment_content_id', 'DESC']],
      attributes: ['recruitment_content_id', [Sequelize.fn('COUNT', 'recruitment_content_id'), 'content_count']],
      where: {
        recruitment_content_id: contentsIdArr
      }
    })
    .then(result => {
      for (data of result) {
        console.log(result)
        recruitmentArr.push(data.dataValues)
      }

      recruitment_content.findAll({
        where: {
          id: contentsIdArr
        },
        order: [['id', 'DESC']]
      })
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          delete result[i].dataValues.userId
          result[i].dataValues.content_count = recruitmentArr[i].content_count
          console.log(contentsIdArr, result)
          if (result[i].dataValues.user_id === token.id) {
            recruitment.push(result[i].dataValues)
          } else {
            application.push(result[i].dataValues)
          }
        }
        res.status(200).send({ rec: recruitment, app: application, message: "test"})
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: '서버 에러' });
  });
};