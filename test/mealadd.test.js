// use the path of your model
const Product = require('../model/track_model');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/FitnessBuddy';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});


afterAll(async () => {
 await mongoose.connection.close();
});

describe('Meal Plan addition', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
 const product = {
 'act': 'sleeping',
 'description': 'after noon time',
 'priority': 'low'
 };
});
});