const { recruitment_content, user_content } = require('../../models');

module.exports = async (req, res) => {
  const { contentId } = req.params;

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
};