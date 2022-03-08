const express = require("express");
const router = express.Router();
const fs = require("fs");

const getVideos = () => {
  const videos = fs.readFileSync("./data/videos.json")
  return JSON.parse(videos);
};

router.route("/").get((_req, res) => {
  let videosConfig = getVideos().map(video => {
    return {
      "id": video.id,
      "name": video.name,
    };
  });

  res.status(200).json(videosConfig);
});

module.exports = router;
