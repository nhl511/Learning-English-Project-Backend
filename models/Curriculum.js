const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const Curriculum = sequelize.define('curriculum', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        NAME: {
            type: DataTypes.STRING(64),
            allowNull: false,
            validate: {len: [1, 64]}
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'curriculums',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return Curriculum
}

