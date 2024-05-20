const { pool } = require('../database/connection.js')
const bcrypt = require('bcryptjs')

const registerAbono = async (abono) => {
    console.log("paso x regis abono")
    console.log(abono)
    let { proyecto, descripcion, monto, fecha_in, fecha_out, activo, user_id } = abono
    const values = [ proyecto, descripcion, monto, fecha_in, fecha_out, activo, user_id ]
    const consulta = "INSERT INTO abonos values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)"
    await pool.query(consulta, values)
    } 

const getAbonos = async () => {
        //const { rows: abonos } = await pool.query("SELECT * FROM abonos WHERE activo='true'" )
        //const { rows: abonos } = await pool.query("SELECT Now()")
        const consulta = "SELECT abonos.id, proyecto, descripcion, monto, fecha_in, user_id, nombre, apellido FROM abonos INNER JOIN users ON abonos.user_id=users.id";
        const { rows: abonos } = await pool.query(consulta)
        //console.log(abonos)
        return abonos
    }
    
const inactiveAbono = async (id) => {
        const values = [id];
        const consulta = "UPDATE abonos SET activo='false' WHERE id=$1"
        const { rowCount } = await pool.query(consulta, values)
        if (!rowCount) throw { code: 404, message: "Error: No se encontró ningún abono" }
    }

module.exports = { registerAbono, getAbonos, inactiveAbono  }