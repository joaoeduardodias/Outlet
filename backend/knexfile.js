// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/db.sqlite'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        useNullAsDefault: true
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },

        ssl: {
            rejectUnauthorized: false
        },
        useNullAsDefault: true,

        pool: {
            min: 2,
            max: 10
        }
    }

};