const express = require('express')
const app = express()
const cors = require('cors')
const Rutas = require("./routes/Routes")

app.listen(3000, console.log("SERVER ON"))
app.use(cors())
app.use(express.json())

///////////// reporte en consola ///////////////////////////////
app.use((req, res, next) => {
   console.log('Request:', req.method, req.originalUrl,'| Time:', new Date())
   next();
 }); 

//////////////////////////////////////////////
app.use("/", Rutas);
////////////////////////////////////////////////////
/////////subir archivo /////////////////////////////

   const fileUpload = require("express-fileupload");
   const path = require('path')
   const assetFolder = path.join(__dirname, "media")

   app.use(fileUpload())
   app.post("/media/", ( req, res) => {
      console.log(req.files)
      const { imageCar } = req.files;
      try {
      imageCar.mv(path.join(assetFolder, imageCar.name));
      res.status(200).json({ message: 'ok' });
      } catch (e){
      res.status(500).json({ message: e.message})
      }
   })

/////////////////////////////////////////////////////

app.get("*", (req, res) => {
   res.status(404).send("ERROR: Esta pagina no existe!!")
    })