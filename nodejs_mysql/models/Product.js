const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'product',
  {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: Sequelize.STRING
    },
    product_price: {
      type: Sequelize.INTEGER
    },
    product_amount: {
      type: Sequelize.INTEGER
    },
    product_img: {
      type: Sequelize.BLOB
    },
    uid_editor: {
      type: Sequelize.INTEGER
    },
    last_edited: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)