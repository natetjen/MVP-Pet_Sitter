require('dotenv').config();
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

const bodyParser = require('body-parser');
// const router = require('./router.js');

app.use(bodyParser());
app.use(express.json());
app.use(history());
app.use(express.static(path.join(`${__dirname}/../client/dist`)));

// app.use('/db', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);