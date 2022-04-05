const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const multer = require('multer');


  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  var upload = multer({ storage: storage }).single("file")
  
  router.post('/image', (req, res) => {
  
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, (err) => {
        if(err) {
            return res.json({ success: false, err })
        }else{
          return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        }
    })
  })
  
  module.exports = router;
