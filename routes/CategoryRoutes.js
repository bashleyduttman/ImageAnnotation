const express=require("express")
const router=express.Router()
const {getCategory, updateCategory}=require("../controller/CategoryController")

router.get('/:id',getCategory);
router.put('/:id',updateCategory)
module.exports=router