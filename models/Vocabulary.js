const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const Vocabulary = sequelize.define('vocabulary', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
       WORD: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {len: [1, 100]}
       },
        DEFINITION: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {len: [1, 100]}
        },
        TRANSCRIPTION: {
            type: DataTypes.STRING(100),
            validate: {len: [0, 100]}
        },
        PARTS_OF_SPEECH_ID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'partsOfSpeech',
                key: 'ID',
            },
            onDelete: 'SET NULL',
        },
        UNIT_ID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'units',
                key: 'ID',
            },
            onDelete: 'CASCADE',
        },
        NOTES: {
            type: DataTypes.STRING(),
            validate: {len: [0, 255]}
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'vocabularies',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return Vocabulary
}

