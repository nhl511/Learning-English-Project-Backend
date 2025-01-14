const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const Unit = sequelize.define('unit', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        UNIT_NUMBER: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 99,
            }
        },
        UNIT_NAME: {
          type: DataTypes.STRING(64),
          allowNull: false,
          validate: {len: [1, 64]}
        },
        GRADE_ID:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'grades',
                key: 'ID',
            },
            onDelete: 'CASCADE',
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'units',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return Unit
}

