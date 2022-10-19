const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class OrderedItem extends Model {
    static associate(models){
      this.belongsTo(models.Order, {as: "Order"}),
      this.belongsTo(models.Merchant, {as: "Merchant"})
      this.belongsTo(models.Product, {as: 'Product'})
    }
  }
  OrderedItem.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      product_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
       picture:{
        type: DataTypes.STRING,
        
      },
      picture_2:{
        type: DataTypes.STRING,
      },
      picture_3:{
        type: DataTypes.STRING,
      },
      quantity_ordered:{
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      resale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      resale_profit:{
        type: DataTypes.INTEGER
      },
      profit_owner: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "OrderedItem",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return OrderedItem
}
