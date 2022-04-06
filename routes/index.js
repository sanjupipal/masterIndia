
require("../model/categories");
require("../model/product");
require("../model/sub_categories");
const router = require("express").Router();
const db = app.sequelize.models;
const { QueryTypes } = require("sequelize");

router.get("/categories",async(req,res)=>{
    try {
        let categories = await db.categories.findAll();
        return res.status(200).json({msg:"success",list:categories})
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})

router.get("/sub-category",async (req,res)=>{
    try {
        const {category_id} = req.query
        if(!category_id) throw new Error("category_id required")
        let sub_category = await db.sub_categories.findAll({where:{category_id}})
        if(!sub_category)return res.status(404).json({msg:"unsuccessful",error:"no subCategory found"})
        return res.status(200).json({msg:"success",list:sub_category})
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})

router.get("/all-products-category",async(req,res)=>{
    try {
        const {category_id} = req.query
        if(!category_id) throw new Error("category_id required")
        let query = `select p.name as name,p.price as price from categories as c join sub_categories as sc
        on c.id = sc.category_id join products as p on sc.id = p.sub_category_id where c.id = ${category_id}`
        let data = await app.sequelize.query(query, { type: QueryTypes.SELECT });
        return res.status(200).json({ msg: "success", list:data });
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})

router.get("/all-products-subcategory",async (req,res)=>{
    try {
        const {sub_category_id} = req.query
        if(!sub_category_id) throw new Error("sub_category_id required")
        let query = `select p.name as name,p.price as price  from sub_categories as sc join products as p on sc.id = p.sub_category_id where sc.id = ${sub_category_id}`
        let data = await app.sequelize.query(query, { type: QueryTypes.SELECT });
        return res.status(200).json({ msg: "success", list:data });
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})
router.post("/product",async (req,res)=>{
    try {
        const {sub_category_id,name,price} = req.body
        if(!sub_category_id) throw new Error("sub_category_id required")
        let data = {
            sub_category_id,
            name,
            price
        }
        let newData = await db.products.create(data)
        return res.status(200).json({msg:"success",...newData.dataValues})
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})

// EXTRA
router.post("/categories",async(req,res)=>{
    try {
        const {name} = req.body
        if(!name) throw new Error("name required")
        let data = {
            name
        }
        let newData = await db.categories.create(data)
        return res.status(200).json({msg:"success",...newData.dataValues})
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})
router.post("/sub-categories",async(req,res)=>{
    try {
        const {category_id, name} = req.body
        if(!category_id) throw new Error("category_id required")
        let data = {
            name,
            category_id
        }
        let newData = await db.sub_categories.create(data)
        return res.status(200).json({msg:"success",...newData.dataValues})
    } catch (error) {
        return res.status(400).json({msg:"unsuccessful",error:error.message || error})
    }
})
module.exports = router;
