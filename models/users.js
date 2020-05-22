module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
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
    })
    return Users
}
