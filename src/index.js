const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const route = require('./routes');
const app = express();
const db = require('./config/db');
const middlewaresExphbs = require('./middlewares/exphbs');

db.connect();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: middlewaresExphbs.helpers,
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());


app.use(cookieparser(process.env.SESSION_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        maxAge: 5 * 60 * 60 * 1000
    }),
);

route(app);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));