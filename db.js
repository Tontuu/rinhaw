const { Pool } = require("pg");
const URL = process.env.DB_URL;

const pool = new Pool({ connectionString: URL,
    max: process.env.DB_POOL | 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.once('connect', () => {
    console.log(`db.js: Connected  to db ${URL}`)
    return pool.query("SELECT NOW()");
});

async function Initialize() {
    try {
        console.log(`db.js: Connecting to db: ${URL}`);
        await pool.connect();
    } catch (err) {
        console.log(`db.js: Error ocurred when connecting to db: ${err}`);
    }
}

Initialize();

module.exports.count = async function count() {
    return pool.query("SELECT COUNT(1) FROM pessoas");
}