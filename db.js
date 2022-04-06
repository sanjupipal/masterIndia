const { Sequelize } = require("sequelize");
(() => {
  // connect Db
  // const db = new Sequelize(process.env.CONNECTION_STRING);
  const db = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  //verify connection
  db.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

  let syncConfig = { alter: { alter: true, drop: false }, force: false };

  db.sync(syncConfig)
    .then(async (value) => {
      // tempData adding in db  
      const { categories, products, sub_categories } = value.models;
      for (let index = 0; index < tempData.length; index++) {
        const value = tempData[index];
        let res = await categories.findOne({ where: { name: value.name } });
        if (!res) {
          let category = await categories.create({ name: value.name });
          for (let index = 0; index < value.subCats.length; index++) {
            const innerVal = value.subCats[index];
            let res1 = await sub_categories.findOne({
              where: { category_id: category.id, name: innerVal.name },
            });
            if (!res1) {
              let subCategory = await sub_categories.create({
                category_id: category.id,
                name: innerVal.name,
              });
              for (let index = 0; index < value.subCats[index].products.length; index++) {
                const doubleInnerVal = value.subCats[index].products[index];
                let res2 = await products
                  .findOne({
                    where: {
                      sub_category_id: subCategory.id,
                      name: doubleInnerVal.name,
                    },
                  })
                  if (!res) {
                    await products.create({
                      sub_category_id: subCategory.id,
                      ...doubleInnerVal,
                    });
                  }
              }
            }
          }
        }
      }
      console.log("Sync Complete");
    })
    .catch((error) => {
      console.log("Sync Error", error);
    });
  app.sequelize = db;
})();
let tempData = [
  {
    name: "Electronics",
    subCats: [
      {
        category_id: 0,
        name: "Mobile",
        products: [
          { name: "s10", price: 90 },
          { name: "s11", price: 90 },
          { name: "s70", price: 90 },
        ],
      },
      {
        category_id: 0,
        name: "Laptop",
        products: [
          { name: "asus", price: 90 },
          { name: "lenovo", price: 90 },
          { name: "acer", price: 90 },
        ],
      },
      {
        category_id: 0,
        name: "Washing Machine",
        products: [
          { name: "lg", price: 90 },
          { name: "loyad", price: 90 },
          { name: "ifb", price: 90 },
        ],
      },
      {
        category_id: 0,
        name: "Ac",
        products: [
          { name: "lg-11", price: 90 },
          { name: "panasonic", price: 90 },
          { name: "chroma", price: 90 },
        ],
      },
    ],
  },
  {
    name: "Sports",
    subCats: [
      {
        category_id: 0,
        name: "FootBall",
        products: [
          { name: "ball", price: 90 },
          { name: "socks", price: 90 },
          { name: "shoes", price: 90 },
        ],
      },
      {
        category_id: 0,
        name: "BasketBall",
        products: [
          { name: "big ball", price: 90 },
          { name: "long socks", price: 90 },
          { name: "tape", price: 90 },
        ],
      },
    ],
  },
  {
    name: "Music",
    subCats: [
      {
        category_id: 0,
        name: "Indian",
        products: [],
      },
      {
        category_id: 0,
        name: "Western",
        products: [],
      },
    ],
  },
  {
    name: "Dance",
    subCats: [
      {
        category_id: 0,
        name: "Kathak",
        products: [],
      },
      {
        category_id: 0,
        name: "Break-Dance",
        products: [],
      },
    ],
  },
];
