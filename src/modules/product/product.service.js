const models = require('../../db/models')
var Sequelize = require('sequelize')
const {fileUploader} = require('../../common/helpers/cloudImageUpload')
const {getPaginatedRecords} = require('../../common/helpers/paginate')

const {
    sequelize,
    Category,
    Product,
    Inventory
} = models

exports.uploadProduct = async (payload) =>{
    try {
        const {
            user,
            name,
            description,
            quantity_available,
            price,
            category_id,
            files
        } = payload
        const imageArray = []
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                name: name,
                deleted: false
            }
        })

        if(existingProduct){
            return{
                error: true,
                message: 'You already uploaded a product with same name',
                data: null
            }
        }
        const newProduct= await Product.create(
            {
                name,
                description,
                quantity_available: Number(quantity_available),
                price: Number(price),
                CategoryId: category_id,
                MerchantId:user.id,           
            },
            {raw: true}
        )
        for(const file of files){
            const {path} = file
            const url = await fileUploader(path)
            imageArray.push(url)
        }
        if(imageArray.length > 0){
            await Product.update(
                {   
                    images: imageArray,
                },
                {
                    where:{id: newProduct.id}
                }
            )
        }
        
       
        const fullProduct = await Product.findOne({where:{id: newProduct.id}})
        return {
            error: false,
            message: "Product uploaded successfully",
            data: fullProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to upload product at the moment",
            data: null
        }
        
    }
}


exports.getSingleProductByAUser = async (data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }
        return {
            error: false,
            message: "Product retreived successfully",
            data: existingProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}

exports.getSingleProductByAMerchant = async (data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }

        const allInventoriesOfAProduct = await Inventory.findAll({
            where:{
                ProductId: data.id,
                deleted: false
            }
        })
        return {
            error: false,
            message: "Product retreived successfully",
            data: [existingProduct, allInventoriesOfAProduct]
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}


exports.getAllProducts = async (data) =>{
    try {
        const {limit, page} = data

        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name", "images", "description", "ratings", "price", "category", "CategoryId"]
        })
        if(allProducts.length < 1){
            return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: [],
                pagination: 0
            }
        }
        }
        return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: allProducts,
                pagination: allProducts.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}


exports.removeProduct = async (user, data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }
        await Product.update(
                {deleted: true},
                {
                    where:{
                        id: (data.id),
                        MerchantId:user.id
                    }   
                }
            )
            const deletedProduct = await Product.findOne({
                where:{
                    MerchantId: user.id,
                    id:(data.id)
                }
            })
        return {
            error: false,
            message: "Product removed successfully",
            data: deletedProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product at the moment",
            data: null
        }
        
    }

}

exports.getMyProductsByMerchant = async (data) =>{
    try {
        const {merchant_id, limit, page} = data
        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            data: {MerchantId: merchant_id},
            selectedFields: ["id", "name", "images", "description", "ratings", "price", "deleted"]
        })
        return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: allProducts,
                pagination: allProducts.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}

exports.getAlllProductsByMerchant = async (data) =>{
    try {
        const {merchant_id, limit, page} = data
        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            data: {MerchantId: merchant_id},
            selectedFields: ["id", "name", "images", "description", "ratings", "price", "deleted"]
        })
        return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: allProducts,
                pagination: allProducts.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}

exports.editAllProducts = async () => {
    try {
        const results = []
       const allProducts = await Product.findAll() 
       if(allProducts.length < 1) {
        return {
            error: false,
            message: "No product found",
            data: []
        }
       }
       for(const prod of allProducts){
            const cat = await Category.findOne({where:{id:prod.CategoryId}})
            await Product.update(
                {
                    images: prod.images,
                    category: cat.name
                },
                {where: {deleted: false}}
            )
            const product = await Product.findOne({where:{id: prod.id}})
            results.push(product)
       }

       return {
            error: false,
            message: "Products retreived successfully",
            data: results
       }


    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to edit product at the moment",
            data: null
        }
    }
}