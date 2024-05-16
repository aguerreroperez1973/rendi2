const { pool } = require('../database/connection.js')
const bcrypt = require('bcryptjs')

const checkUser = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM users WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "Error: El usuario NO existe" }
    else {  
            const { password: passwordEncriptada } = usuario
            const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
            if (!passwordEsCorrecta || !rowCount)
            throw { code: 401, message: "Error: Email o contraseña incorrecta" }
        }
    }
    
const registerUser = async (usuario) => {
    console.log(usuario)
    let { nombre, apellido, email, password, activo } = usuario
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [ nombre, apellido, email, passwordEncriptada, activo ]
    const consulta = "INSERT INTO users values (DEFAULT, $1, $2, $3, $4, $5)"
    await pool.query(consulta, values)
    }

const getUsers = async () => {
        const { rows: users } = await pool.query("SELECT * FROM users")
        //const { rows: users } = await pool.query("SELECT Now()")
        //console.log(users)
        return users
    }

const getUser = async (email) => {
        const consulta = "SELECT * FROM users WHERE email = $1"
        const values = [email]
        const { rows } = await pool.query(consulta, values)
        console.log(rows)
        return rows
    }
    
const deleteUser = async (id) => {
        const consulta = "DELETE FROM users WHERE id = $1"
        const values = [id]
        const { rowCount } = await pool.query(consulta, values)
        if (!rowCount) throw { code: 404, message: "Error: No se encontró ningún usuario" }
    }

module.exports = { getUsers, checkUser ,deleteUser, registerUser, getUser }