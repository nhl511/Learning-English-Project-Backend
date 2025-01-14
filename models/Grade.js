const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const Grade = sequelize.define('grade', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        GRADE_NUMBER: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 12,
            }
        },
        CURRICULUM_ID:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'curriculums',
                key: 'ID',
            },
            onDelete: 'CASCADE',
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'grades',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return Grade
}

