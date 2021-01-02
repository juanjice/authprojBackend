const express= require("express");
const mongoose= require("mongoose");
const cors = require("cors");
require("dotenv").config();
//preparacion  de express
const app= express();

app.use(express.json());
app.use(cors());
const PORT =process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`El servidor se ha iniciado en el puerto ${PORT}`));
//preparar mongoose para conectarse con mongo db
//clave de usuario mogo db

mongoose.connect(process.env.MOONGODB_CONECTION_STRING,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true

},(err)=>{
    if(err) throw err;
    console.log("MongoDB coneccion establecida");

});
//preparar las rutas
app.use("/users",require("./routes/userRoutes"))

