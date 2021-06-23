const { nanoid } = require("nanoid");
const archiver = require("archiver");
const configurations = require("../config/configurations");
const fs = require("fs");
const validateId = async (req, res, next, id) => {
  if (!id) {
    return res.status(400).json({ error: "Session Id could not be blank!" });
  }

  const database = req.app.get("database");
  const [session] = await database("sessions")
    .where("id", "=", id)
    .catch(() => []);
  if (!session) {
    return res.status(400).json({ error: `Session #${id} was not found!` });
  }

  res.locals.session = session;
  return next();
};

const post = async (req, res, next) => {
  const database = req.app.get("database");

  const [sessionId] = await database("sessions")
    .returning("id")
    .insert({
      created_at: new Date(),
    })
    .catch((error) => []);

  if (!sessionId) {
    return res.status(500).json({ error: "Could not create new session" });
  }
  return res.status(200).json({ id: sessionId });
};
const putSessionIdFile = async (req, res, next) => {
  const session = res.locals.session;

  // Retrieve database connection, database database <-> knex
  const database = req.app.get("database");
  const files = req.files;
  // Check file is empty
  if (!req.files) return res.status(404).json({ error: `Can't read the file` });

  const rows = [];
  for (let file of files) {
    const row = {
      name: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      session_id: session.id,
    };
    rows.push(row);
  }

  const insertedRows = await database("files")
    .returning("*")
    .insert(rows)
    .catch(() => []);
  if (!insertedRows.length) {
    return res.status(500).json({ error: `Upload files fail` });
  }

  return res.status(200).json({ data: insertedRows });
};

const confirm = async (req, res, next) => {
  const session = res.locals.session;
  const database = req.app.get("database");
  //Case 3: session is already confirmed
  if (session.confirmed_at) {
    return res
      .status(400)
      .json({ error: `Session ${session.id} has already confirmed` });
  }

  const result = await database("sessions")
    .returning(["id", "confirmed_at"])
    .where("id", "=", session.id)
    .update(`confirmed_at`, new Date())
    .catch((error) => ({ error }));

  if (result.error) return next(result.error);
  return res.status(200).json(result);
};

const generateZipToken = async (req, res, next) => {
  const database = req.app.get("database");
  const session = res.locals.session;
  const archive = archiver("zip");
  const files = await database("files")
    .where("session_id", "=", session.id)
    .catch(() => []);

  session.files = files;
  // Generate unique token
  const token = nanoid();

  const downloadPath = [
    configurations.file.downloadFolder,
    `${token}.zip`,
  ].join("/");
  const output = fs.createWriteStream(downloadPath);

  archive.on("error", function (err) {
    throw err;
  });
  archive.pipe(output);
  for (let file of session.files) {
    const uploadPath = [configurations.file.uploads, file.name].join("/");
    archive.append(fs.createReadStream(uploadPath), { name: file.name });
  }
  archive.finalize();
  res.status(200).json(`${token}.zip`);
};
const downloadByZipToken = async (req, res, next) => {
  const token = req.params.tarball_token;

  if (!token) {
    return res.status(400).json({ error: "Token could not be blank!" });
  }
  // return file
  res.download(`${configurations.file.downloadFolder}/${token}`, (err) => {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  validateId,
  post,
  putSessionIdFile,
  confirm,
  generateZipToken,
  downloadByZipToken
};
