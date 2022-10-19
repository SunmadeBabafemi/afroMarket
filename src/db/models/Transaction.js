const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Transaction extends Model {
    static associate(models){
      this.belongsTo(models.User, {as: "User"})
    }
  }
  Transaction.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      tx_ref: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      currency:{
        type: DataTypes.STRING,
        defaultValue: 'NGN'
      },
      order_id: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM,
        values:['inbound', 'outbound'],
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'successful', 'failed', "cancelled"],
        defaultValue: 'pending'
      },
      flw_transaction_id: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Transaction",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Transaction
}