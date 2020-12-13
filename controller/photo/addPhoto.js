module.exports = {
  post: async (req, res) => {
    try {
      console.log("업로드 대기 중인 사진정보: ", req.file);

      let payLoad = {
        success: true,
        url: req.file.location, // S3에 저장된 파일의 최종 url
        fileName: req.file.originalname, // S3에 저장된 파일의 최종 name
      };
      res.status(200).json(payLoad);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  },
};
