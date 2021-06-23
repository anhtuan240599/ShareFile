require("dotenv").config();

module.exports = {
  database: {
    connection: {
      host:
        process.env.SHAREONE_DATABASE_HOST ||
        "ec2-54-225-228-142.compute-1.amazonaws.com",
      port: Number(process.env.SHAREONE_DATABASE_PORT) || 5432,
      user: process.env.SHAREONE_DATABASE_USER || "syfbypioxxrqkz",
      password:
        process.env.SHAREONE_DATABASE_PASSWORD ||
        "1b4283d6214de66fbb0f7931a63c4f8841ad39f60565790d1f10fe7f5e1a6774",
      database: process.env.SHAREONE_DATABASE_DATABASE || "d3u87lhmqb657t",
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  file: {
    uploads: process.env.SHAREONE_FILE_UPLOAD_FOLDER || "./uploads",
    limits: {
      fileSize: Number(process.env.SHAREONE_FILE_LIMIT_FILESIZE) || 262144000,
    },
    deniedFile:
      process.env.SHAREONE_FILE_DENIED_MIMETYPE || "application/x-msdownload",
    downloadFolder: "./public/download",
  },
  url: {
    domain: process.env.SHAREONE_FILE_DOMAIN || "http://localhost:3000",
    urlSplit: process.env.SHAREONE_FILE_URL_SPLIT || "?token=",
  },
  queue: {
    name: process.env.SHAREONE_QUEUE_NAME || "shareone-downloader",
    redis: {
      host: process.env.SHAREONE_QUEUE_REDIS_HOST || "127.0.0.1",
      port: Number(process.env.SHAREONE_QUEUE_REDIS_PORT) || 6379,
      password: process.env.SHAREONE_QUEUE_REDIS_PASSWORD,
    },
  },
};
