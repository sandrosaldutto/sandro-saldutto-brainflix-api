const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const fs = require("fs");
const {v4: uuidv4 } = require("uuid");


const getVideos = () => {
  const videos = fs.readFileSync("./data/videos.json");
  return JSON.parse(videos);
};

const storeVideos = (videos) => {
  fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
}

router.route("/")
.get((_req, res) => {
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
      duration: video.duration,
      video: video.video,
    };
  });

  res.status(200).json(videosConfig);
})
.post((_req,res) => {
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    description: req.body.description,
    views: req.body.views,
    likes: req.body.likes,
    timestamp: req.body.timestamp,
    comments: req.body.comments,
    duration: req.body.duration,
    video: req.body.video,
  }

  let videos = getVideos();
  videos.push(newVideo)

  storeVideos(videos)

  res.status(201).send({
    "id": newVideo.id,
    "status": "new video has been added"
  })
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


// post comments 
module.exports = router;
