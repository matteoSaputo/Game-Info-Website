module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define("Game", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        genre:{
            type: DataTypes.STRING,
            allowNull: true
        },
        company:{
            type: DataTypes.STRING,
            allowNull: true
        },
        system:{
            type: DataTypes.STRING,
            allowNull: true
        },
        thumbnail:{
            type: DataTypes.STRING,
            allowNull: true
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull: true
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        },
    });

    Game.associate = (models) => {
        Game.hasMany(models.Review, {
            onDelete: "cascade"
        })
    }

    return Game;
};