const { Sequelize, DataTypes } = require("sequelize");
const sub_categories = {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
};
app.sequelize.define("sub_categories", sub_categories, {
  indexes: [
    {
      fields: ["category_id"],
    },
  ],
});
