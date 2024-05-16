const { Pool } = require('pg')

const pool = new Pool({
host: '127.0.0.1',
user: 'postgres',
password: 'postgres',
database: 'rendir_db',
allowExitOnIdle: true
})

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}

getDate()