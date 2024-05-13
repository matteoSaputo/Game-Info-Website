const express = require('express');
const app = express();

const db = require('./models');

app.use(express.json());

//Routers
const gameRouter = require('./routes/Game')
app.use('/game', gameRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running");
    });
}); 