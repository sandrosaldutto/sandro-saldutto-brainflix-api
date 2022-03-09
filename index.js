const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


app.use(express.json())

app.use(cors());

// routes
const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

// listen
app.listen(process.env.PORT, () => {
    console.log(process.env)
    console.log("server is on port 8080")
})