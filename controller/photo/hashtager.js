const { Photo, HashTag } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { hashtag, photoPath } = req.body;

    const newHashtag = await HashTag.create({
      subject: hashtag,
    });

    // 해시태그에 해당하는 사진이 있다면 해당 사진에 hashtagId 삽입!
    if (photoPath) {
      const jane = await User.create({ name: "Jane" });
      console.log(jane.name); // "Jane"
      jane.name = "Ada";
      // the name is still "Jane" in the database
      await jane.save();
      // Now the name was updated to "Ada" in the database!
    }

    try {
      res.status(201).json({ ...newHashtag, success: true });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  },
};
