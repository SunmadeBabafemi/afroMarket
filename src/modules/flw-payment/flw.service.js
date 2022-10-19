const KEYS = require('../../common/config/keys')
const Flutterwave = require('flutterwave-node-v3')
const flw = new Flutterwave(KEYS.flwPubkey, KEYS.flwSecKey)
const axios = require('axios')
const models = require('../../db/models')
var Sequelize = require('sequelize')
const { uuid } = require('uuidv4')
const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Inventory,
    Merchant,
    Tracker,
    Transaction
} = models


exports.makePaymentInbound = async (paymentDetails) => {
    try {
        
        const {
            user,
            tx_ref,
            amount,
            redirect_url,
            email,
            name,
            phone_number,
            order_id,
            tracking_id

        } = paymentDetails

        const Data = {
                tx_ref,
                amount,
                currency: 'NGN',
                redirect_url,
                customer: {
                    email,
                    phonenumber: phone_number,
                    name,
                    order_id,
                    tracking_id
                }
            }
        if(email !== user.email){
            return{
                error: true,
                message: "payment process diverted",
                data: null
            }
        }



        const {status, statusText, data} = await axios.post(
            KEYS.flwPaymentUrl,
            Data,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },
            
        )
        if (status >= 400){
            return {
                error: true,
                message: statusText,
                data: data
            }

        }
        console.log(Transaction);

        const transaction = await Transaction.create(
            {
                tx_ref,
                amount,
                order_id,
                email,
                type: 'inbound',
                UserId: user.id
            },
            {raw: true}
        )

        return{
            error: false,
            message: data.message,
            data: {
                data,
                transaction
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 


exports.confirmPaymentInbound = async (paymentResponse) => {
    try {
        
        const {
            status,
            tx_ref,
            flw_transaction_id
        } = paymentResponse

        const pendingTransaction = await Transaction.findOne({where:{tx_ref: tx_ref}}) 
        if(!pendingTransaction){
            return {
                error: true,
                message: "Ongoing Transaction Not Found"
            }
        }
        await Transaction.update(
            {
                flw_transaction_id: flw_transaction_id,
                status: status,
            },
            {where:{tx_ref: tx_ref}}
        )
        const completedTransaction = await Transaction.findOne(
            {attributes: {excludes: ['deleted']}},
            {where:{tx_ref: tx_ref}}
            )
        if(status === "successful"){
            await Order.update(
                {isPaid: true},
                {where:{id: pendingTransaction.order_id}}
            )
            const paidOrder = await Order.findOne(
                {attributes:{excludes:['deleted']}},
                {where:{id: pendingTransaction.order_id}}
            )
            return paidOrder
        }
        

        return{
            error: false,
            message: `payment ${status}`,
            data: {
                completedTransaction,
                paidOrder
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 