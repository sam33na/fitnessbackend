const user=require('../model/login_model')
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/FitnessBuddy';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});

describe('New user register', () => {
    it('Insert', () => {
        const customer = {
            'name': 'Test',
            'email': 'Test@gmail.com',
            'username': 'Test',
            'password': 'Test',
            'phone':'38388839',

        };

        return user.create(customer)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('Test');
            });
    });





// //--------------------------Login Testing-----------------
// it('Login test for registered user', () => {
//     const login = {
//     'username': 'Test',
//     'password': 'Test'
//     };
//     return user.findOne(login)
//     .then((pro_ret) => {
//     expect(pro_ret.username).toEqual('Test');
//     });
//     });

});    