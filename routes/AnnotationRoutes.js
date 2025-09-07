const express=require("express")
const router=express.Router();
const {postAnnotations,getAnnotations,updateAnnotations,deleteAnnotations}=require("../controller/AnnotationController")
router.get('/:image_id',getAnnotations);
router.post('/:image_id',postAnnotations);
router.put('/:id',updateAnnotations);
router.delete('/:id',deleteAnnotations);


module.exports=router;