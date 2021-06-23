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

  // Check session
  if (session.confirmed_at) {
    return res
      .status(400)
      .json({ error: `Session #${session.id} was confirmed` });
  }

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

module.exports = {
  validateId,
  post,
  putSessionIdFile
};
