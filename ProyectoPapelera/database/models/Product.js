module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'
    let cols = {
          id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: dataTypes.STRING(255),
            allowNull: false
          },
          description: {
            type: dataTypes.STRING(255),
            allowNull: false
          },
          price: {
            type: dataTypes.INTEGER,
            allowNull: false
          },
          image: {
            type: dataTypes.STRING(255),
            allowNull: false
          },

          productCategory_id: dataTypes.INTEGER
    };
    let config = {
      tablename:"products",
      timestamps: false
    };

    const Product= sequelize.define(alias, cols, config);

    Product.associate = function(models) {
      Product.belongsTo(models.User, {
          as: "Product",
          foreignKey: "id_user"
      })

      Product.associate = function(models) {
        Product.belongsTo(models.ProductCategory, {
            as: "Products_Category",
            foreignKey: "productCategory_id",
        },
        )
    };
}
Product.belongsToMany(models.User, {
  as: "Products_Users",
  through: "products_users",
  foreignKey: "id_product",
  otherKey: "id_user",
  timestamps: false,
});

    return Product
}