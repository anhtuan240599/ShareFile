const express = require("express");
const cors = require("cors");

const configuration = require("./config/configurations");
const useDatabase = require("./libs/database");

const app = express();

app.set("database", useDatabase(configuration.database));
app.use(express.static("public"));

//Error function
server.use((err, req, res, next) => {
  const error = server.get("env") === "development" ? err : {};
  const status = err.status || 500;

  //response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Middlewares
server.use(cors());
