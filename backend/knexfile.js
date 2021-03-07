// Update with your config settings.

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
    connection: process.env.DATABASE_URL,
    ssl: {
      sslmode: "require",
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
