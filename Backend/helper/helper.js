const cloudinary = require("cloudinary");
const _ = require("underscore");

const Q = require("q");

function upload(file) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Q.Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      (err, res) => {
        if (err) {
          console.log("Cloudinary error", err);
          reject(err);
        } else {
          console.log("Cloudinary res:", res);
          return resolve(res.url);
        }
      }
    );
  });
}

module.exports.upload = upload;
