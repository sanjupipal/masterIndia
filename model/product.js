const { Sequelize, DataTypes } = require("sequelize");
const products = {
  sub_category_id: {
    type: DataTypes.INTEGER,
    required: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
};
app.sequelize.define("products", products, {
  indexes: [
    {
      fields: ["sub_category_id"],
    },
  ],
});
