const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const Topic = sequelize.define('topic', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        TITLE: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {len: [1, 100]}
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'topics',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return Topic
}

