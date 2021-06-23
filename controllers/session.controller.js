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

module.exports = {
    validateId
}
