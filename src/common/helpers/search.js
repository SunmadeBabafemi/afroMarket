const {sequelize} = require('../../db/models')

exports.searchModel = async (
model, {limit:specifiedLimit = 10, page, searchField}
) =>{
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;

      var searchResult = await model.findAndCountAll({
            limit: limit,
            offset,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchField + '%')
            },
            order: [
             ["created_at", "DESC"]
            ],
        })
        const raw = await model.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchField + '%')
            },
            order: [
             ["created_at", "DESC"]
            ],
        })
        const total = raw.length
        return {
            array: raw,
            data: searchResult,
            total: total,
            currentPage: page,
            hasNext: (page * limit) < total,
            hasPrevious: page > 1,
            perPage: limit,
            totalPages: Math.ceil(total / limit),
        };
    } catch (err) {
      console.log(err);
        
    }
}