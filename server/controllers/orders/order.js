const { user_content } = require('../../models');
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {

  const token = isAuthorized(req);
  const { contentId } = req.params;

  const [ memo, created ] = await user_content.findOrCreate({
    where: { user_id: token.id, recruitment_content_id: contentId }
  })  

  if (!created) {
    return res.status(200).send({ message: "이미 신청된 게시물" })
  } else {
    res.status(200).send({ message: "게시물 신청 완료"})
  }
  // console.log("---1---", memo)
  // console.log("---2---", created)


  // user_content.findOrCreate({
  //   where: {
  //     user_id: token.id,
  //     recruitment_content_id: contentId
  //   }
  // }
  //   {
  //   user_id: token.id,
  //   recruitment_content_id: contentId
  // }
  // )
  // .spread((data, created) => {
  //   console.log(data.get({
  //     plain: true
  //   }), created)
  // })
  // .then(_ => {
  //   user_content.count({
  //     where: {
  //       recruitment_content_id: contentId
  //     }
  //   })
  //   .then(result => {
  //     console.log(result)
  //   })
  //   res.status(201).send({ message: '참가 신청 성공' });
  // })
  // .catch(err => {
  //   console.log('ordersCancel error :', err);
  //   res.status(500).send({ message: '서버 에러' });
  // })
}