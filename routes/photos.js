const express = require("express");
const router = express.Router();
const multer = require("multer");
const { photoController } = require("../controller");

// S3 객체 활용을 위해 aws-sdk 로드
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new aws.S3();

let upload = multer({
  // S3 저장 규칙
  storage: multerS3({
    // s3 bucket 연동내용
    s3: s3,
    bucket: "mystar-story.com",

    // 업로드 파일명 부여(경로명 끝에 JPG 파일포맷을 추가)
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".jpg");
    },

    // 용량제한 설정
    contentLength: 500000000,

    // 업로드 파일들에 대한 권한 설정
    acl: "public-read-write",

    // content-type 범위 설정: 아무나 드루온나
    // (...는 훼이크고 클라이언트가 multipart/form-data로 보내주기로 하였읍니다.)
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

// 가자! 아침의 node.js!
// ~MVC에 대한 열망을 가득 담아~
router.get("/", photoController.intro.get);
router.get("/main", photoController.main.get);
router.post("/addphoto", upload.single("file"), photoController.addPhoto.post);
router.post("/savephoto", photoController.savePhoto.post);
router.get("/:id", photoController.pickPhoto.get);
router.patch("/:id/modify", photoController.modifyPhoto.patch);
router.delete("/:id/delete", photoController.deletePhoto.delete);

module.exports = router;
