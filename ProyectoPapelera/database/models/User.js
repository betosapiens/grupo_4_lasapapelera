const Sequelize = require('sequelize');
const sequelize = require('../database'); 

module.exports = (sequelize,dataTypes)=>{

    let alias = "User";
    let cols = {
id:{
type: dataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},
first_name:{
    type: dataTypes.STRING,
    allowNull: false
},
last_name:{
    type: dataTypes.STRING,
    allowNull: false
},
email:{
    type:dataTypes.STRING,
    allowNull: false
},
password:{
    type:dataTypes.STRING,
    allowNull: false
},
image:{
    type: dataTypes.STRING,
    allowNull: false
},
userCategory_id:{
    type: dataTypes.INTEGER
},

    };
    let config = {
        tablename:"users",
        timestamps: false
    }


const User = sequelize.define(alias, cols, config)

User.associate = function(models) {


    User.associate = function(models) {
        User.hasMany(models.Product, {
            as: "Product",
            foreignKey: "id_user"
        })

}
User.belongsToMany(models.Products, {
    as: "Products_Users",
    through: "products_users",
    foreignKey: "id_user",
    otherKey: "id_product",
    timestamps: false,
});

User.associate = function(models) {
    User.belongsTo(models.UserCategory, {
        as: "userCategory",
        foreignKey: "userCategory_id"
    })
}

return User

}
}