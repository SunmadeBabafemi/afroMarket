'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Admins", deps: []
 * createTable "Merchants", deps: []
 * createTable "Categories", deps: []
 * createTable "Users", deps: []
 * createTable "Products", deps: [Merchants, Categories]
 * createTable "Trackers", deps: [Orders]
 * createTable "Orders", deps: [Users, Trackers]
 * createTable "OrderedItems", deps: [Orders, Merchants, Products]
 * createTable "Inventories", deps: [Merchants, Products, Categories]
 * createTable "Disputes", deps: [Users, OrderedItems]
 *
 **/

var info = {
    "revision": 1,
    "name": "models",
    "created": "2022-10-01T18:34:39.435Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Admins",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "role": {
                    "type": Sequelize.ENUM('super', 'admin'),
                    "field": "role",
                    "defaultValue": "admin"
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Merchants",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "business_name": {
                    "type": Sequelize.STRING,
                    "field": "business_name"
                },
                "business_type": {
                    "type": Sequelize.ENUM('public limited company', 'private limited company'),
                    "field": "business_type",
                    "defaultValue": "public limited company"
                },
                "business_description": {
                    "type": Sequelize.STRING,
                    "field": "business_description"
                },
                "bank_verification_number": {
                    "type": Sequelize.INTEGER,
                    "field": "bank_verification_number"
                },
                "cac_document": {
                    "type": Sequelize.STRING,
                    "field": "cac_document"
                },
                "tax_id_number": {
                    "type": Sequelize.INTEGER,
                    "field": "tax_id_number"
                },
                "brand_image": {
                    "type": Sequelize.STRING,
                    "field": "brand_image"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "created_by": {
                    "type": Sequelize.STRING,
                    "field": "created_by"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "delivery_address": {
                    "type": Sequelize.STRING,
                    "field": "delivery_address"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "picture_3": {
                    "type": Sequelize.STRING,
                    "field": "picture_3"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "quantity_available": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_available",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "isapproved": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isapproved",
                    "defaultValue": false
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "status": {
                    "type": Sequelize.ENUM('available', 'out of stock'),
                    "field": "status",
                    "defaultValue": "available"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "MerchantId": {
                    "type": Sequelize.UUID,
                    "field": "MerchantId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Merchants",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "CategoryId": {
                    "type": Sequelize.UUID,
                    "field": "CategoryId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Trackers",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "status": {
                    "type": Sequelize.ENUM('order_placed', 'order_in_progress', 'order_shipped', 'order_out_for_delivery', 'order_id_delivered'),
                    "field": "status",
                    "defaultValue": "order_placed"
                },
                "trackingId": {
                    "type": Sequelize.STRING,
                    "field": "trackingId"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "OrderId": {
                    "type": Sequelize.UUID,
                    "field": "OrderId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "items": {
                    "type": Sequelize.STRING,
                    "field": "items"
                },
                "isPaid": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isPaid",
                    "defaultValue": false
                },
                "payment_type": {
                    "type": Sequelize.ENUM('pay-now', 'on-delivery'),
                    "field": "payment_type",
                    "defaultValue": "on-delivery"
                },
                "order_cost": {
                    "type": Sequelize.INTEGER,
                    "field": "order_cost",
                    "defaultValue": 0
                },
                "delivery_type": {
                    "type": Sequelize.ENUM('door_delivery', 'pickup_station'),
                    "field": "delivery_type",
                    "defaultValue": "door_delivery"
                },
                "delivery_address": {
                    "type": Sequelize.STRING,
                    "field": "delivery_address",
                    "allowNull": false
                },
                "delivery_date": {
                    "type": Sequelize.DATE,
                    "field": "delivery_date"
                },
                "customer_contact": {
                    "type": Sequelize.STRING,
                    "field": "customer_contact"
                },
                "status": {
                    "type": Sequelize.ENUM('canceled', 'active', 'delivered', 'disputed'),
                    "field": "status",
                    "defaultValue": "active"
                },
                "trackingId": {
                    "type": Sequelize.STRING,
                    "field": "trackingId"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.UUID,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "TrackerId": {
                    "type": Sequelize.UUID,
                    "field": "TrackerId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Trackers",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OrderedItems",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "product_name": {
                    "type": Sequelize.STRING,
                    "field": "product_name",
                    "allowNull": false
                },
                "quantity_ordered": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_ordered",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "defaultValue": false
                },
                "total": {
                    "type": Sequelize.INTEGER,
                    "field": "total",
                    "defaultValue": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "resale": {
                    "type": Sequelize.BOOLEAN,
                    "field": "resale",
                    "defaultValue": false
                },
                "resale_profit": {
                    "type": Sequelize.INTEGER,
                    "field": "resale_profit"
                },
                "profit_owner": {
                    "type": Sequelize.STRING,
                    "field": "profit_owner"
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "OrderId": {
                    "type": Sequelize.UUID,
                    "field": "OrderId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "MerchantId": {
                    "type": Sequelize.UUID,
                    "field": "MerchantId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Merchants",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "ProductId": {
                    "type": Sequelize.UUID,
                    "field": "ProductId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Inventories",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "picture_3": {
                    "type": Sequelize.STRING,
                    "field": "picture_3"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "quantity_available": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_available",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "isapproved": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isapproved",
                    "defaultValue": false
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "status": {
                    "type": Sequelize.ENUM('available', 'out of stock'),
                    "field": "status",
                    "defaultValue": "available"
                },
                "inventory_owner": {
                    "type": Sequelize.STRING,
                    "field": "inventory_owner"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "MerchantId": {
                    "type": Sequelize.UUID,
                    "field": "MerchantId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Merchants",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "ProductId": {
                    "type": Sequelize.UUID,
                    "field": "ProductId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "CategoryId": {
                    "type": Sequelize.UUID,
                    "field": "CategoryId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Disputes",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "product_image": {
                    "type": Sequelize.STRING,
                    "field": "product_image"
                },
                "reason": {
                    "type": Sequelize.ENUM('Wrong Order', 'Lost Order', 'Damaged Product', 'Fake Product'),
                    "field": "reason"
                },
                "status": {
                    "type": Sequelize.ENUM('Initiated', 'Won', 'On_Going', 'Lost'),
                    "field": "status",
                    "defaultValue": "Initiated"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.UUID,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "OrderedItemId": {
                    "type": Sequelize.UUID,
                    "field": "OrderedItemId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "OrderedItems",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
