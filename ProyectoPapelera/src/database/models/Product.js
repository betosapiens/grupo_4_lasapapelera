module.exports = (sequelize,DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price : DataTypes.DECIMAL,
        image: DataTypes.STRING,
        categoryId: DataTypes.INTEGER
    }
    
    let config ={
        tableName: 'products',
        timestamps: false,
   
    }
    
    const Product = sequelize.define(alias, cols,config);
    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as : 'category',
            foreignKey : 'categoryId'
        })
    }
    return Product;
}