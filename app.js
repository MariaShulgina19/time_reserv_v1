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
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/css', express.static('css'))

//Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);

//reservation
app.get('/', is_logged_handler, reservation_controller.get_reservations);
app.post('/delete-reservation', is_logged_handler, reservation_controller.post_delete_reservation); //app.delete
app.get('/reservation/:id', is_logged_handler, reservation_controller.get_reservation);//test to check particular reservation
app.get('/reservation/:id', reservation_controller.get_reservation);//test to check particular reservation only by Postman
app.post('/add-reservation', is_logged_handler, reservation_controller.post_reservation);
//app.put('/check-reservation', is_logged_handler, reservation_controller.post_check_reservation);
//app.put('/reservation/:id', is_logged_handler, reservation_controller.post_check_reservation); //put_update_reservation
app.post('/update-reservation', is_logged_handler, reservation_controller.post_update_reservation);
app.post('/reservation/go_back',is_logged_handler, reservation_controller.post_back_to_reservation);



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