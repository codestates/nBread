const { recruitment_content, user_content } = require('../../models');
const { Op, Sequelize } = require('sequelize');
const { isAuthorized } = require('../tokenFunctions')

module.exports = async (req, res) => {
  // 임시 데이터, contentIdArr 받아올 방법 생각하기
  const token = isAuthorized(req, res);
  if (!token) {
    // 토큰 없을 시 반환할 때 201?? 수정해야하나 여쭤보기
    return res.status(204).send({ message: '권한 없음' })
  }

  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(204).send({message: '자료 없음'});
  } 
  const startArr = start.split(',');
  const endArr = end.split(',');
  const contents = [];
  const contentsIdArr = [];
  const mycontentsArr = [];

  await user_content.findAll({
    where: {
      user_id: token.id
    },
    attributes: ['recruitment_content_id']
  })
  .then (result => {
    for (data of result) {
      mycontentsArr.push(data.dataValues.recruitment_content_id)
    }

    recruitment_content.findAll({
      where : {
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
        },
        [Op.not] : [
          { closed : 2 }
        ]
      },
      order: [
        ['id', 'DESC']
    ]
    })
    .then(data => {
      for (i of data) {
        if (mycontentsArr.includes(i.dataValues.id)) {
          if (i.dataValues.user_id === token.id) {
            i.dataValues.rel = '모집자'
          } else {
            i.dataValues.rel = '신청자'
          }
        } else {
          i.dataValues.rel = ''
        }
        delete i.dataValues.userId
        contents.push(i.dataValues)
        contentsIdArr.push(i.dataValues.id)
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
        for (let i = 0; i < result.length; i++) {
          contents[i]['content_count'] = result[i].dataValues.content_count
        }
        res.status(200).send({ data: contents, message: '글 조회 성공' });
      })
    })
  })
  .catch(err => {
    console.log('boardDetailLookup error :', err);
    res.status(500).send({message: '서버 에러'});
  })
};
