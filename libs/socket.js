const WebSocket = require("ws");
const configurations = require("../config/configurations");

module.exports = function socket(app, session) {
  const wss = new WebSocket.Server({
    server: app,
    verifyClient: function (info, cb) {
      const paramToken = info.req.url;
      const token = paramToken.split(configurations.url.urlSplit)[1];
      if (token == session.id) {
        cb(true);
      }
    },
  });
  return wss;
};
