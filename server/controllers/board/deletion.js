const { recruitment_content } = require('../../models');

module.exports = async (req, res) => {
  const { contentId } = req.params;

  await recruitment_content.destroy({ where : {
    id: contentId
  }})
  .then(_ => {
    res.status(200).send({ message: '글 삭제 성공' });
  })
  .catch(err => {
    console.log('boardDeletion error :', err);
    res.send(500).send({message: '서버 에러'});
  })
};