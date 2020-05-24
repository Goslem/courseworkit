module.exports = (sequelize, DataTypes) => {
    const Bonuses = sequelize.define(
        'Bonuses',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    )

    Bonuses.associate = (models) => {
        Bonuses.belongsTo(models.Company)
        Bonuses.belongsToMany(models.Users, { through: 'userBonuses', timestamps: false })
    }

    return Bonuses
}
