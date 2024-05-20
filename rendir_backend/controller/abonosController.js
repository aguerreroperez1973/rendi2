const jwt = require('jsonwebtoken');
const { registerAbono, getAbonos, inactiveAbono } = require('../models/abonosModel.js');
const { res } = require('express');

const addAbono = async (req, res) => {
        try {
            const abono = req.body
            const Authorization = req.header("Authorization")
            const token = Authorization.split("Bearer ")[1]
               jwt.verify(token, "az_AZ")
                await registerAbono(abono)
                res.send("Abono ingresado")
            } catch (error) {
            res.status(500).send(error)}
        }

const allAbonos = async (req, res) => {
        try {
            const abonos = await getAbonos()
            res.json(abonos)
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

const closeAbono = async (req, res) => {
        try {
            const { id } = req.params;
            const Authorization = req.header("Authorization")
            const token = Authorization.split("Bearer ")[1]
            jwt.verify(token, "az_AZ")
            await inactiveAbono(id)
            res.send("Abono cerrado con éxito")
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

module.exports = { addAbono, allAbonos, closeAbono}