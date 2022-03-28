const { recruitment_content } = require('../../models');

module.exports = async (req, res) => {
  console.log(req.params, req.query)
  const { contentId } = req.params;
  const { address, category_food, recruitment_personnel, delivery_fee, restaurant_name, body, lat, lng } = req.body;
  if (!closed) {
    await recruitment_content.update({
      address: address,
      category_food: category_food,
      recruitment_personnel: recruitment_personnel,
      delivery_fee: delivery_fee,
      restaurant_name: restaurant_name,
      body: body
    }, { where: {
      id: contentId
    }})
    .then(_ => {
      res.status(200).send({ message: '글 수정 성공' });
    })
    .catch(err => {
      console.log('boardDetailLookup error :', err);
      res.status(500).send({ message: '서버 에러' });
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
      res.status(500).send({ message: '서버 에러' });
    })
  }
};