const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const port = 6767;

const {
    commandsRouter,
    powerRouter,
    volumeRouter,
} = require('./route');


//set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());     
app.use(helmet());


//route set up
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/', commandsRouter);
app.use('/', powerRouter);
app.use('/', volumeRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));