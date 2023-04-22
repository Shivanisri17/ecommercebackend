'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
var cors = require('cors');



const port = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);
app.listen(port);


console.log(`App Runs on ${port}`);
