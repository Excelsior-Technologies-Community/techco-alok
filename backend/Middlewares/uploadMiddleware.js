const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/${folderName}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },

    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg/;
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  };

  return multer({ storage, fileFilter });
};

module.exports = createUploader;