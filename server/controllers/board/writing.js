const { recruitment_content, user_content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions')

module.exports = async (req, res) => {

  const token = isAuthorized(req, res);
  if (!token) {
    // 토큰 없을 시 반환할 때 201?? 수정해야하나 여쭤보기
    return res.status(204).send({ message: '권한 없음' })
  }
  const { address, food, recruitmentPersonnel, fee, restaurantName, body } = req.body;

  const content = {
    user_id: token.id,
    address: address,
    category_food: food,
    delivery_fee: fee,
    recruitment_personnel: recruitmentPersonnel,
    // created_at: now(),
    restaurant_name: restaurantName,
    body: body,
    closed: 1,
  }

  await recruitment_content.create(content)
  .then(data => {
    user_content.create({
      user_id: token.id,
      content_id: data.dataValues.id
    })
  })
  .then(_ => {
    res.status(201).send({message: '글 작성 성공'});
  })
  .catch(err => {
    console.log('boardWriting error :', err);
    res.status(500).send({message: '서버 에러'});
  })
}