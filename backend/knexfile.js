// Update with your config settings.
console.log(process.env.DB_URL_SSL);

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
