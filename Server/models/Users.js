const { DataTypes, Model, Op } = require('sequelize');

module.exports = class Users extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            email:{
                type: DataTypes.STRING,
                // defaultValue: 0
            },
            password: {
                type: DataTypes.STRING,
                // defaultValue: 0
            },
            dateOfBirth:{
                type: DataTypes.DATE,
                // defaultValue: 0
            },
        },{
            tableName: 'users',
            timestamps: true,
            sequelize
        });
    }
}