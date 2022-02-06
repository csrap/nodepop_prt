var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const LoginController = require('./controllers/loginController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionMiddlware');
const MongoStore = require('connect-mongo');
const basicAuth = require('./lib/basicAuthMiddleare');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const MoneyController = require('./controllers/moneyController');




const conexionDB = require('./lib/db.conexion');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var announcementRouter = require('./routes/API/announcement.routes');

var app = express();


// Conexion a la DB

conexionDB();



//Prueba de i18n 
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to Nodepop'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'Nodeapi';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();
const moneyController = new MoneyController();

// Setuo de i18n 
const i18n = require('./lib/i18nConfigure');

// Para que express lo use, devuelve un midelware de express
app.use(i18n.init);

// Setup de sesiones del  website 
app.use(session({
  name: 'nodeapi-session',
  secret: '[CPwz3^T!#*hj%wbbjh2+&FKZAW>9C!w',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de inactividad 
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING
  })
}));

//disponibilidad de la sesión en todas las views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//rutas de la pagina 
//POST /api/authenticate para hacer login y devolver un token JWT
app.post('/api/authenticate', loginController.postJWT);
app.get('/api/money/:cantidad/:desde/:hacia', jwtAuth, moneyController.index);
app.post('/api/login', loginController.postJWT);

//GET /api/anuncios incluyendo el JWT en una cabecera o query-string hará la peticióncorrecta (200 OK)
app.use('/api/announcements', jwtAuth, announcementRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);




app.use('/', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/newProduct', basicAuth, require('./routes/newProduct'));
app.use('/privado', sessionAuth, require('./routes/privado'))


// Con los controllers
app.get('/Login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

app.get('/api/announcements', jwtAuth, announcementRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
