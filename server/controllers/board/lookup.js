const { recruitment_content } = require('../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  // 임시 데이터, contentIdArr 받아올 방법 생각하기
  const { start, end } = req.body;
  const startArr = start.split(',');
  const endArr = end.split(',');
  console.log(startArr, endArr)
  await recruitment_content.findAll({ where : {
    lat : {
      [Op.and] : {
        [Op.gt] : Number(startArr[0]),
        [Op.lt] : Number(endArr[0])
      }
    },
    lng : {
      [Op.and] : {
        [Op.gt] : Number(startArr[1]),
        [Op.lt] : Number(endArr[1])
      }
    }
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
    res.status(500).send({message: '서버 에러'});
  })
};