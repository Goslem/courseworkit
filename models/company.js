module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('company', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
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
        Company.belongsTo(models.users)
        Company.hasMany(models.bonuses)
    }

    return Company
}
