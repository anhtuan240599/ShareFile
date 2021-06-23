require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
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

    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
