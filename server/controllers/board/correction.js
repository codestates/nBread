const { recruitment_content } = require('../../models');

module.exports = async (req, res) => {
  console.log(req.params, req.query)
  const { contentId } = req.params;
  const { address, food, recruitmentPersonnel, fee, restaurantName, body, closed } = req.body
  if (!closed) {
    await recruitment_content.update({
      address: address,
      category_food: food,
      recruitment_personnel: recruitmentPersonnel,
      delivery_fee: fee,
      restaurant_name: restaurantName,
      body: body
    }, { where: {
      id: contentId
    }})
    .then(_ => {
      res.status(200).send({ message: '글 수정 성공' });
    })
    .catch(err => {
      console.log('boardDetailLookup error :', err);
      res.send(500).send({ message: '서버 에러' });
    })
  } else {
    await recruitment_content.update({
      closed: 2
    }, { where: {
      id: contentId
    }})
    .then(_ => {
      res.status(200).send({ message: '글 마감 성공' });
    })
    .catch(err => {
      console.log('boardCorrection error :', err);
      res.send(500).send({ message: '서버 에러' });
    })
  }
};