module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reviewText: {
            type: DataTypes.TEXT,
            allowNull: true    
        }
    });

    return Review;
};