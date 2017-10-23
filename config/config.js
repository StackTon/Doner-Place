module.exports = {
    development: {
        port: process.env.PORT || 1337,
        dbPath: 'mongodb://localhost:27017/Doner-Place'
    },
    production: {}
};