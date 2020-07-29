const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'profile',
  {
    profile_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    birth_day: {
      type: Sequelize.DATE
    },
    profile_img: {
      type: Sequelize.BLOB
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    last_edit: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)