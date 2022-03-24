const { recruitment_content } = require('../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  // 임시 데이터, contentIdArr 받아올 방법 생각하기
  const contentIdArr = [1, 2]
  await recruitment_content.findAll({ where : {
    id: contentIdArr
  }})
  .then(data => {
    const contents = [];
    for (i of data) {
      delete i.dataValues.userId
      contents.push(i.dataValues)
    }
    res.status(200).send({ data: contents, message: '글 조회 성공' });
  })
  .catch(err => {
    console.log('boardDetailLookup error :', err);
    res.send(500).send({message: '서버 에러'});
  })
};