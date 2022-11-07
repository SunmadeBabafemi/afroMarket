const models = require('../../db/models')
var Sequelize = require('sequelize')
const {paginateRaw} = require('../../common/helpers/paginate')

const {
    sequelize,
    Product,
    Review,
    Merchant
} = models

exports.createReview = async (payload) =>{
    try {

        const {body, user, productId} = payload
        
        const review = await Review.create({
            ...body,
            ProductId: productId,
            UserId: user.id
        })
        const result = await Review.findAll({
             attributes: [
                [Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('rating'), 'integer')), 'avgRating']
            ],
            where:{ProductId: productId}
        })
        const avgRating = result[0].dataValues.avgRating
        await Product.update(
            {ratings: Number(avgRating)},
            {where:{id: productId}}
        )
    // update merchant ratings
        const product = await Product.findOne({where:{id: productId}})
        const allProducts = await Product.findAll({
             attributes: [
                [Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('ratings'), 'integer')), 'avgRating']
            ],
            where:{MerchantId: product.MerchantId}
        })
        const merchRatings = allProducts[0].dataValues.avgRating
        await Merchant.update(
            {ratings: Number(merchRatings)},
            {where:{id: product.MerchantId}}
        )
         return {
            error: false,
            message: "Review submitted successfully",
            data: {
                review: review,
                averageRating: avgRating,
                merhantRating: merchRatings
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create an Review at the moment",
            data: null
        }
        
    }
}

exports.reviewsOfAProduct = async (body) =>{
    try {
        const {limit, page, id} = body
        const allreviews = await Review.findAll({
            attributes:['id', 'text', 'rating', 'ProductId', 'UserId'],
            where:{ProductId: id, deleted: false}
        })
        const paginatedReviews = await paginateRaw(allreviews, {
            limit: Number(limit),
            page: Number(page)
        })
        
        return {
            error: false,
            message: "Product reviews retreived successfully",
            data: {
                reviews: paginatedReviews,
                pagination: paginatedReviews.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive Reviews of this product at the moment",
            data: null
        }
        
    }
}

exports.deleteMyReview = async (body) =>{
    try {
        const {user, id} = body
        const myReview = await Review.findOne({
            where:{
                id:id,
                UserId: user.id
            }
        })
        if(!myReview){
            return{
                error: true,
                message: "Review not found",
                data: null
            }
        }

        await Review.update(
            {deleted: true},
            { 
                where:{
                    id:id,
                    UserId: user.id
                }
            }
        )
        return {
            error: false,
            message: "Review deleted successfully",
            data:null
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to delete Review at the moment",
            data: null
        }
        
    }
}


