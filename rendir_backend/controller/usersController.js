const jwt = require('jsonwebtoken');
const { checkUser, registerUser, getUsers, getUser } = require('../models/usersModel.js')

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log("email: " + email)
        await checkUser(email, password)
        const token = jwt.sign({ email }, "az_AZ", {expiresIn: 1200})
        console.log(token)
        res.send({token} )
        } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
        }
    }

const addUser = async (req, res) => {
    try {
    const usuario = req.body
    await registerUser(usuario)
    res.send("Usuario creado")
    } catch (error) {
    res.status(500).send(error)
    }
    }

const listUsers = async (req, res) => {
        try {
            const Authorization = req.header("Authorization")
            const token = Authorization.split("Bearer ")[1]
            jwt.verify(token, "az_AZ")
            const { email } = jwt.decode(token)
            const users = await getUsers()
            res.json(users)
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

const findUser = async (req, res) => {
        try {
            const Authorization = req.header("Authorization")
            const token = Authorization.split("Bearer ")[1]
            jwt.verify(token, "az_AZ")
            const { email } = jwt.decode(token)
            const user = await getUser(email)
            res.json(user)
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    }

const checkRouteLogin = async (req, res, next) => {
        const { email, password } = req.body
        if(email === ''|| password === '' || email === undefined || password === undefined )
        { res.status(401).json({ message: "Error: Debe incluir email y password" })}
        else {
                next()
         }  
    }

const checkToken = async (req, res, next) => {
        console.log("paso checktoken")
        const Authorization = req.header("Authorization")
        if(Authorization === '' || Authorization === undefined )
        { res.status(401).json({ message: "Error: Token Null" }); console.log("Error: Token Null")}
        else {
                next()
         }
    }

module.exports = { loginUser, addUser, listUsers, findUser, checkRouteLogin, checkToken }