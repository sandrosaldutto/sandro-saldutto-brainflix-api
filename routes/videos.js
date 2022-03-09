const express = require("express");
const router = express.Router();
const fs = require("fs");


router.route("/").get(( _req, res ) => {
res.status(200).send({
    message: "home"
})
})

router.get("/videos", ( _req, res ) =>{
    res.status(200).send({
        message: "videos"
    })
})


  

module.exports = router;
