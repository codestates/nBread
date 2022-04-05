const { recruitment_content, user_content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions')

module.exports = async (req, res) => {

  const { contentId } = req.params;
  const recruitmentArr = [];
  const token = isAuthorized(req, res);
  console.log("---1---", token)
  if (!token) {
    await recruitment_content.findOne({ where : {
      id: contentId
    }})
    .then(data => {
      delete data.dataValues.userId

      user_content.count({
        where: {
          recruitment_content_id: contentId
        }
      })
      .then(result => {
        data.dataValues.content_count = result
        res.status(200).send({ data: data.dataValues, message: '글 조회 성공' });
      })
    })
    .catch(err => {
      console.log('boardDetailLookup error :', err);
      res.status(500).send({message: '서버 에러'});
    })
  } else {

    const { contentId } = req.params;
    const recruitmentArr = [];

    await recruitment_content.findOne({ where : {
      id: contentId
    }})
    .then(data => {
      delete data.dataValues.userId

      user_content.findAll({
        where: {
          recruitment_content_id: contentId
        }
      })
      .then(result => {

        for (let data2 of result) {
          if (data2.dataValues.user_id === token.id) {
            if (data.dataValues.user_id === token.id) {
              data.dataValues.rel = '모집자';
            } else {
              data.dataValues.rel = '신청자';
            }
          } else {
            data.dataValues.rel = '';
          }
        }
        data.dataValues.content_count = result.length
        res.status(200).send({ data: data.dataValues, message: '글 조회 성공' });
      })
    })
    .catch(err => {
      console.log('boardDetailLookup error :', err);
      res.status(500).send({message: '서버 에러'});
    })
  }
};