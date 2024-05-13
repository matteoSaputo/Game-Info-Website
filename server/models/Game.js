module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define("Game", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        genre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        company:{
            type: DataTypes.STRING,
            allowNull: false
        },
        system:{
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail:{
            type: DataTypes.STRING,
            allowNull: true
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Game;
};