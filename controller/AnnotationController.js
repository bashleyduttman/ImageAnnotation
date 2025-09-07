const pool=require("../config/db")
const getAnnotations=async(req,res)=>{
    try{
        const image_id=parseInt(req.params.image_id);
        const query=`SELECT a.Category_id,a.Id,a.Bbox,a.category_id FROM Annotations  a 
                     INNER JOIN category c ON a.category_id=c.id 
                     WHERE a.image_id=?`;
        const [result]=await pool.execute(query,[image_id]);
        if(result.length==0)return res.status(404).send("there are no annotations");
        return res.status(200).send({message:"annotations retrieval is successfull",annotations:result})
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Cant able to retrieve annotations");
    }
}
const postAnnotations=async(req,res)=>{
    try{
       
        const image_id=parseInt(req.params.image_id);
        console.log(image_id);
        const verify= `SELECT * FROM images WHERE id=?`
        const [result]=await pool.execute(verify,[image_id]);
        if(result.length==0){
            return res.status(400).send("There is no Image to Annotate");
        }
        const {category_name,Bbox}=req.body;
        const query1=`INSERT INTO category(name) VALUES(?)`;
        const [rows1]=await pool.execute(query1,[category_name]);
        const category_id=rows1.insertId;
        const query2=`INSERT INTO Annotations(Image_id,Category_id,Bbox) VALUES(?,?,?)`;
        const [rows2]=await pool.execute(query2,[image_id,category_id,Bbox]);
        if(rows2.affectedRows==0){
            return res.status(400).send("annotations is not stored");
        }
        
        return res.status(200).send({id:rows2.insertId,category_id:category_id });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("annotations cant be added");
    }
}
const updateAnnotations=async(req,res)=>{
    try{
        const id=parseInt(req.params.id);
        const {Bbox}=req.body;
        const query=  `UPDATE Annotations SET Bbox=? WHERE Id=?`
        const [result]=await pool.execute(query,[Bbox,id]);
        if(result.affectedRows==0){
            return res.status(400).send("cant update the annotations");
        }
        return res.status(200).send("updated successfully!");

    }
    catch(err){
        res.status(500).send("cant able to update the annotations");
    }
}
const deleteAnnotations=async(req,res)=>{
    try{
        const id=parseInt(req.params.id);
        console.log(`deletion ${id}`);
        const query=`DELETE FROM Annotations WHERE Id=?`;
        const [result]=await pool.execute(query,[id]);
        if(result.affectedRows==0){
            return res.status(400).send("Deletion failed");
        }
        return res.status(200).send("Deleted Successfully");
    }
    catch(err){
        return res.status(500).send("Deletion Failed ");
    }
    
}
module.exports={getAnnotations,postAnnotations,updateAnnotations,deleteAnnotations}