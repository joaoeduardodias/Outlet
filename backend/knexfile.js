require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite",
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL_SSL,
    ssl: {
      rejectUnauthorized: false,
    },

    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },

    useNullAsDefault: true,

    pool: {
      min: 2,
      max: 10,
    },
  },
};
