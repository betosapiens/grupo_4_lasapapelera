module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategory";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      type: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
    };
    let config = {
      tablename:"user_category",
      timestamps: false,
    };

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {
      UserCategory.hasMany(models.Users, {
        as: "users",
        foreignKey: "userCategory_id",
      });
    };

    return UserCategory;
  };