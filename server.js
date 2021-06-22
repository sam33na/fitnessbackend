const mongoose=require('mongoose');
const express=require('express');
const path = require('path')
const bodyParser =require('body-parser');
const cors = require('cors')

const db= require('./database/db');

const app = express();//core module
app.use(express.json());


app.listen(90);