const cloudinary= require("../config/cloudinary")
const pool=require("../config/db")
const getImages=async(req,res)=>{
    try{
        const query=`SELECT id,Image_url FROM images`;
        const [result]=await pool.execute(query);
        console.log(result);
        return res.status(200).send({message:"files successfully retrieved",URL:result})
    }
    catch(err){
        res.status(500).send("image not available")
    }
    
}
const postImages=async(req,res)=>{
try{
        if(!req.file){
            return res.status(400).send("file not uploaded")
        }
        const result=await new Promise((resolve,reject)=>{

        const stream=cloudinary.uploader.upload_stream(
            {folder:"myUpload"},
            (err,result)=>{
                if(err) reject(err)
                else resolve(result)
            }
            
        )
        stream.end(req.file.buffer)
        })
        const mime_mapper={
            "image/jpeg":"jpeg",
            "image/jpg":"jpg",
            "image/png":"png",
            "image/webp":"webp",
            "image/gif": "gif",
            "image/bmp": "bmp",

        }
        console.log(req.file)
        console.log(result.secure_url);
        const query=`INSERT INTO images(image_url,file_name,file_type,file_size) VALUES(?,?,?,?)`
        const [rows]=await pool.execute(query,[
            result.secure_url,
            req.file.originalname,
            mime_mapper[req.file.mimetype],
            req.file.size
        ])
        return res.status(200).send({message:"File uploaded Successfully",URL:result.secure_url});

    }
catch(err){
        console.log(err)
        return res.status(500).send("upload failed");
        
    }
}
const deleteImages=async(req,res)=>{
    try{
       
        const id=parseInt(req.params.id);
        console.log(id);
        
        const query=`DELETE FROM images WHERE id=?`;
        const [rows]=await pool.execute(query,[id]);
        if(rows.affectedRows==0)return res.status(404).send("Image not found");
        res.status(200).send("Image Successfully Deleted!")
    }
    catch(err){
        return res.status(500).send("Image Not Deleted!");
    }


}
module.exports={getImages,postImages,deleteImages}