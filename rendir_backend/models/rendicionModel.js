const { response } = require('express')
const { pool } = require('../database/connection.js')
const bcrypt = require('bcryptjs')

const registerRendicion = async (rendicion) => {
    console.log(rendicion)
    let { monto, tipo_gasto, tipo_doc, number_doc, fecha_in, activo, abono_id, detalle, user_id, saldo } = rendicion
    const values = [monto, tipo_gasto, tipo_doc, number_doc, fecha_in, activo, abono_id, detalle, user_id, saldo ]
    const consulta = "INSERT INTO rendiciones values (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
    await pool.query(consulta, values)
    }

const getRendiciones = async () => {
    const consulta = "SELECT * FROM rendiciones"
    const { rows: rendiciones } = await pool.query(consulta)
    return rendiciones
    }

const getRendicion = async ( id ) => {
    const values = [ id ]
    const consulta = "SELECT * FROM rendiciones WHERE id = $1"
    const {rows: rendicion} = await pool.query(consulta, values)
    return rendicion
    }
    
const deleteRendicion = async (id) => {
        const consulta = "DELETE FROM rendiciones WHERE id = $1"
        //const consulta = "SELECT Now()"
        const values = [id]
        await pool.query(consulta, values)
    }

module.exports = { registerRendicion, getRendicion, getRendiciones ,deleteRendicion }