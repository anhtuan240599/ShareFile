const validateId = async (req, res, next) => {
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

module.exports = {
  validateId,
  post
};
