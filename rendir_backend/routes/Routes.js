const express = require("express");
const router = express.Router();

///////// seccion users /////////////////////////////////
const { loginUser, addUser, listUsers, findUser, checkRouteLogin, checkToken } = require('../controller/usersController')
router.post("/login",checkRouteLogin ,loginUser)
router.post("/users",checkToken, addUser)
router.get("/user/:id",checkToken, findUser )
router.get("/lista", listUsers )

/////////  seccion abonos //////////////////////////////
const { addAbono, allAbonos, closeAbono} = require('../controller/abonosController')
router.post("/abono", checkToken, addAbono)
router.patch("/abono/closed/:id", checkToken, closeAbono)
router.get("/abonos/", allAbonos )

////////  seccion rendiciones  ////////////////////////
const { addRendicion, allRendiciones, findRendicion, delRendicion} = require('../controller/rendicionController');
router.post("/rendicion",checkToken, addRendicion )
router.get("/rendiciones", allRendiciones )
router.get("/rendicion/:id",checkToken, findRendicion )
router.delete("/delrendicion/:id",checkToken, delRendicion)

////////// ruta por defecto //////////////////////////
router.get("*", (req, res) => {
   res.status(404).send("ERROR: Esta pagina no existe!!")
    })

module.exports = router;
