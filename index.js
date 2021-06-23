const express = require("express");
const cors = require("cors");

const configuration = require("./config/configurations");
const useDatabase = require("./libs/database");

const app = express();

const sessionRoute = require('./routes/sessions')

app.set("database", useDatabase(configuration.database));
app.use(express.static("public"));

//Error function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  //response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Middlewares
app.use(cors());
app.get("/", (req,res) => {
    res.send("Welcome to ShareFile")
})
app.use("/api/sessions",sessionRoute)

module.exports = app;
