module.exports = (sequelize, dataTypes) => {
    let alias = "Products_Category";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: dataTypes.STRING(255),
      },

    };
    let config = {
      tablename:"products_category",
      timestamps: false,
    };

    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = function(models) {
      ProductCategory.hasMany(models.Products, {
          as: "Products",
          foreignKey: "productCategory_id",
      },
      )
  };

    return ProductCategory;
  };