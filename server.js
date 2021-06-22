const mongoose=require('mongoose');
const express=require('express');
const bodyParser =require('body-parser');
// const path = require('path')
// const cors = require('cors')

const db= require('./database/db');
const login_route=require('./route/loginRoute');

const app = express();//core module
app.use(express.json());
app.use(login_route);

app.listen(90);