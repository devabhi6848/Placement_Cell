const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const expressLayouts = require('express-ejs-layouts');
const db =require('./config/mongoose');
// const sass = require('sass');
// const CsvParser = require('json2csv');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);




app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
app.set("layout extractScripts", true)
app.set("layout extractStyles", true);

app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name: 'EmployeeData',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes'))


app.listen(port,function(error) {

    if (error) {
        console.log(`Error in running the server on port ${port} , ${error}`);
    }
    console.log("server is running sucessfully on port",port);
})