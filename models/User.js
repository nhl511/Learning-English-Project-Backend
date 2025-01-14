const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('user', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        EMAIL: {
            type: DataTypes.STRING(320),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                },
                len: {
                    args: [1, 320],
                    msg: "Email length must be between 1 and 320 characters"
                }
            }
        },
        PASSWORD: {
            type: DataTypes.STRING(),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 64],
                    msg: "Password must be from 6 to 64 characters long"
                }
            }
        },
        FIRST_NAME: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {len: [0, 50]}
        },
        LAST_NAME: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {len: [0, 50]}
        },
        ADMIN: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        EMAIL_VERIFIED_AT: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
    })
    return User
}

