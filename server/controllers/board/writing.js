const { recruitment_content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions')

module.exports = async (req, res) => {

  // 토큰 발급 시 주석 해제
  // const token = isAuthorized(req);
  // if (!token) {
  //   // 토큰 없을 시 반환할 때 201?? 수정해야하나 여쭤보기
  //   return res.status(204).send({ message: '권한 없음' })
  // }
  const { address, food, recruitmentPersonnel, fee, restaurantName, body } = req.body;

  const content = {
    // 토큰 발급 시 아래 내용으로 변경
    // user_id: token.id,
    address: address,
    category_food: food,
    delivery_fee: fee,
    recruitment_personnel: recruitmentPersonnel,
    // created_at: now(),
    restaurant_name: restaurantName,
    body: body,
    closed: 1,
    user_id: 2
  }

  await recruitment_content.create(content)
  .then(_ => {
    res.status(201).send({message: '글 작성 성공'});
  })
  .catch(err => {
    console.log('boardWriting error :', err);
    res.send(500).send({message: '서버 에러'});
  })
}