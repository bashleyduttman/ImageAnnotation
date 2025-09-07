const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
const PORT=3001
const pool = require("./config/db");
const ImageRoutes=require('./routes/ImageRoutes')
const AnnotationRoutes=require("./routes/AnnotationRoutes")
const CategoryRoutes=require("./routes/CategoryRoutes")
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello from home")
})
app.use("/api/images",ImageRoutes)
app.use("/api/annotations",AnnotationRoutes)
app.use("/api/category",CategoryRoutes)
app.listen(PORT,()=>{console.log(`listening on ${PORT}`)})
