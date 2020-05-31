module.exports = (sequelize, DataTypes) => {
    const CompanyImages = sequelize.define(
        'companyImages',
        {
            src: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    )

    CompanyImages.associate = (models) => {
        CompanyImages.belongsTo(models.company)
    }

    return CompanyImages
}
