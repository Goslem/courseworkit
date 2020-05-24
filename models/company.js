module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        videoLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        targetAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    })

    Company.associate = (models) => {
        Company.belongsTo(models.Users)
        Company.hasMany(models.Bonuses)
    }

    return Company
}
