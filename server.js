const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json())

app.use(cors());

app.use((req, res, next) => {
    res.status(200).send({
        message: "successful"
    })
})

// routes
const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

// listen
app.listen(8080, () => {
    console.log("server is on port 8080")
})