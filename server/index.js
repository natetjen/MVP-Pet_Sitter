require('dotenv').config();
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const controller = require('./controller/controller.js')

const app = express();

const bodyParser = require('body-parser');
// const router = require('./router.js');

app.use(bodyParser());
app.use(express.json());
app.use(history());
app.use(express.static(path.join(`${__dirname}/../client/dist`)));
app.post('/petsitter', controller.newProfile)
app.get('/petsitter', controller.findProfile)
app.put('/availability', controller.availabilityUpdate)
app.get('/searchSitter', controller.searchSitter)

// app.use('/db', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);