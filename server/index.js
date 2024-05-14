const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');

app.use(express.json());
app.use(cors());

//Routers
const gameRouter = require('./routes/Game');
app.use('/game', gameRouter);
const userRouter = require('./routes/User');
app.use('/auth', userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running");
    });
}); 