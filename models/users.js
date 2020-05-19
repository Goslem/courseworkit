module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    })
    return Users
}
