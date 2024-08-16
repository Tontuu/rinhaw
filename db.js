const { Pool } = require("pg");
const URL = process.env.DB_URL;

const pool = new Pool({ connectionString: URL,
    max: process.env.DB_POOL | 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.once('connect', () => {
    console.log(`db.js: Connected  to db ${URL}`)
    return pool.query("SELECT NOW();");
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
    return pool.query("SELECT COUNT(1) FROM pessoas;");
}

module.exports.postPerson = async function postPerson(user) {
    return pool.query(
        "INSERT INTO pessoas(id, nome, apelido, nascimento, stack) VALUES ($1, $2, $3, $4, $5::json);",
        [user.id, user.nome, user.apelido, user.nascimento, JSON.stringify(user.stack)]
    );
}

module.exports.searchPerson = async function searchPerson(id) {
    return pool.query(
        "SELECT id, apelido, nome, nascimento, stack FROM pessoas WHERE id = $1;",
        [id]
    );
}

module.exports.searchByTerm = async function searchByTerm(term) {
    return pool.query(
        "SELECT id, apelido, nome, nascimento, stack FROM pessoas WHERE searchable ILIKE $1 LIMIT 50;",
        [`%${term}%`]
    );
}