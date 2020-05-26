module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        login: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        socialId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Users.associate = (models) => {
        Users.hasMany(models.company)
        Users.belongsToMany(models.bonuses, { through: 'userBonuses', timestamps: false })
    }

    return Users
}
