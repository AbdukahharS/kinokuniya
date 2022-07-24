const multer = require('multer')

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        file.originalname.split('.').reverse()[0]
    )
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
})

module.exports = upload
