//Start server: npm run start-dev
//Shutdown server: CTRL + C in terminal

const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth_controller');
const reservation_controller = require('./controllers/reservation_controller');



let app = express();
app.use(body_parser.json()); //req.body.name to read postman body

app.use(body_parser.urlencoded({
    extended: true 
}));

app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/service_root_url/login');
    }
    next();
};



//Serve Static files
app.use('/css', express.static('css'))

//Auth
app.use(auth_controller.handle_user);
app.get('/service_root_url/login', auth_controller.get_login);
app.post('/service_root_url/login', auth_controller.post_login);
app.post('/service_root_url/register', auth_controller.post_register);
app.post('/service_root_url/logout', auth_controller.post_logout);

//reservation
app.get('/service_root_url', is_logged_handler, reservation_controller.get_reservations);  ///reservations
//DELETE
app.post('/service_root_url/delete-reservation', is_logged_handler, reservation_controller.post_delete_reservation); //app.delete
app.delete('/service_root_url/reservation/:id', is_logged_handler, reservation_controller.delete_delete_reservation);//NEW
//READ
app.get('/service_root_url/reservation/find/:id', is_logged_handler, reservation_controller.get_reservation);// to check particular reservation by ID
app.get('/service_root_url/reservation/find/:name', is_logged_handler, reservation_controller.get_reservation_byname);// to check particular reservation by name
//ADD
app.post('/service_root_url/add-reservation', is_logged_handler, reservation_controller.post_reservation);
//UPDATE
app.post('/service_root_url/update-reservation', is_logged_handler, reservation_controller.post_update_reservation);
app.put('/service_root_url/reservation/:id', is_logged_handler, reservation_controller.put_update_reservation); 
app.patch('/service_root_url/reservation/:id', is_logged_handler, reservation_controller.patch_update_reservation); 


app.post('/service_root_url/reservation/go_back',is_logged_handler, reservation_controller.post_back_to_reservation);



app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});


const mongoose_url = 'mongodb+srv://time_reservdb:WTKzUjiiLWpqCw0q@cluster0.va8sk.gcp.mongodb.net/time_reservdb?retryWrites=true&w=majority';

mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});