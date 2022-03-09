const express = require("express");
const router = express.Router();
const fs = require("fs");

const getVideos = () => {
  const videos = fs.readFileSync("./data/videos.json");
  return JSON.parse(videos);
};

router.route("/").get((_req, res) => {
  let videosConfig = getVideos().map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
      description: video.description,
      views: video.views,
      likes: video.likes,
      timestamp: video.timestamp,
      comments: video.comments,
    };
  });

  res.status(200).json(videosConfig);
});

router.get('/:videoId', (req, res) => {
    const singleVideo = getVideos().find(video => video.id === req.params.videoId);
    console.log(getVideos(), singleVideo)
    if (!singleVideo) {
        res.status(404).json({
            message: "Video not found"
        })
        return;
    }
    
    res.status(200).json(singleVideo)
})

module.exports = router;
