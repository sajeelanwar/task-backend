const express = require('express');
const connectDB = require('./config/db');
const auth = require("./routes/auth")
const tasks = require("./routes/tasks")
const cors = require('cors');
const app = express();

connectDB();

app.use(cors());
app.use(express.json())

app.use("/auth", auth)
app.use("/tasks", tasks)

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;