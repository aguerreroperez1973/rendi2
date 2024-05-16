const jwt = require('jsonwebtoken');
const { registerRendicion, getRendiciones, getRendicion, deleteRendicion,  } = require('../models/rendicionModel.js');

const addRendicion = async (req, res) => {
    try {
            const rendicion = req.body
            await registerRendicion(rendicion)
            res.send("Rendicion ingresada")
        } catch (error) {
            res.status(500).send(error)
        }
    }

const allRendiciones = async (req, res) => {
    try {
            const rendiciones = await getRendiciones()
            res.json(rendiciones)
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

const findRendicion = async (req, res) => {
        try {
            const { id } = req.params;
            const rendicion = await getRendicion(id)
            res.json(rendicion)
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

    const delRendicion = async (req, res) => {
        try {
            const { id } = req.params;
            await deleteRendicion(id)
            res.send("Rendicion eliminada con éxito")
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

module.exports = { addRendicion, allRendiciones, findRendicion, delRendicion }

 //const Authorization = req.header("Authorization")
            //const token = Authorization.split("Bearer ")[1]
            //jwt.verify(token, "az_AZ")
            //const { id } = jwt.decode(token)