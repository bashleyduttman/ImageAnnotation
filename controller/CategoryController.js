const pool = require("../config/db");
const getCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log("Category ID:", id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid category id");
    }

    const query = `SELECT name FROM CATEGORY WHERE Id = ?`;
    const [result] = await pool.execute(query, [id]); 

    if (result.length === 0) {
      return res.status(404).send("Category not found");
    }
    return res.json(result[0]); 
  } catch (err) {
    console.error(err);
    return res.status(500).send("Unable to get category name");
  }
};
const updateCategory=async(req,res)=>{
try{
    const {name}=req.body;
    console.log(name)
    const id=parseInt(req.params.id);
    const query=`UPDATE category SET name =? WHERE ID=?`;
    const [result]=await pool.execute(query,[name,id]);
    if(result.affectedRows==0){
        return res.status(400).send("not updated")
    }
    return res.status(200).send("updated successfully")
}
catch(err){
    console.log(err)
    return res.status(500).send("cant able to update");
}
}

module.exports = { getCategory ,updateCategory};
