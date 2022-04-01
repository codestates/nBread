const { recruitment_content, user_content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions')

module.exports = async (req, res) => {

  const token = isAuthorized(req, res);
  if (!token) {
    // 토큰 없을 시 반환할 때 201?? 수정해야하나 여쭤보기
    return res.status(204).send({ message: '권한 없음' })
  }
  const { address, category_food, recruitment_personnel, delivery_fee, restaurant_name, body, lat, lng } = req.body;
  
  const content = {
    user_id: token.id,
    address: address,
    category_food: category_food,
    delivery_fee: delivery_fee,
    recruitment_personnel: recruitment_personnel,
    // created_at: now(),
    restaurant_name: restaurant_name,
    body: body,
    lat: lat,
    lng: lng,
    closed: 1
  };

  await recruitment_content.create(content)
  .then(data => {
    user_content.create({
      user_id: token.id,
      recruitment_content_id: data.dataValues.id
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