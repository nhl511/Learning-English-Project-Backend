const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const PartsOfSpeech = sequelize.define('partsOfSpeech', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        NAME: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {len: [1, 20]}
        },

        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'partsOfSpeech',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return PartsOfSpeech
}

