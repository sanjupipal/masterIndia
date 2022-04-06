const { Sequelize, DataTypes } = require("sequelize");
const categories = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
};
app.sequelize.define("categories", categories, {
  indexes: [
    {
      fields: ["name"],
    },
  ],
});
