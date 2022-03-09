const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json())

app.use(cors());

// routes
const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

// listen
app.listen(8080, () => {
    console.log("server is on port 8080")
})