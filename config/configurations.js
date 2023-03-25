require("dotenv").config();

module.exports = {
  database: {
    connection: {
      host:
        process.env.SHAREONE_DATABASE_HOST ||
        "ep-spring-base-864849.ap-southeast-1.aws.neon.tech",
      port: Number(process.env.SHAREONE_DATABASE_PORT) || 5432,
      user: process.env.SHAREONE_DATABASE_USER || "anhtuan240599",
      password:
        process.env.SHAREONE_DATABASE_PASSWORD || "xcDs9wo4hiXT",
      database: process.env.SHAREONE_DATABASE_DATABASE || "neondb",
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
  },
};
