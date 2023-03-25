require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
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
