const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${folder}`;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname)
      );
    },
  });

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const productUpload = multer({
  storage: createStorage("products"),
  fileFilter: imageFilter,
});

const paymentUpload = multer({
  storage: createStorage("payments"),
  fileFilter: imageFilter,
});

module.exports = {
  productUpload,
  paymentUpload,
};