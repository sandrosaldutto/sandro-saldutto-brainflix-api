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
    title: _req.body.title,
    channel: _req.body.channel,
    image: _req.body.image,
    description: _req.body.description,
    views: _req.body.views,
    likes: _req.body.likes,
    timestamp: _req.body.timestamp,
    comments: _req.body.comments,
    duration: _req.body.duration,
    video: _req.body.video,
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
