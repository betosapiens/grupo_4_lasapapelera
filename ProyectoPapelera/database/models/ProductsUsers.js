module.exports = (sequelize, dataTypes) => {
    let alias = "products_users";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: {
        type: dataTypes.INTEGER,
      },
      id_user: {
        type: dataTypes.INTEGER,
      },
    };
    let config = {
      tablename:"products_users",
      timestamps: false,
    };
  
    const ProductsUsers = sequelize.define(alias, cols, config);
  
    return ProductsUsers;
  };
  

  