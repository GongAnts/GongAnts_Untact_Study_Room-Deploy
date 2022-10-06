require('dotenv').config();
const express = require('express');
const app = express();
const socketio = require('socket.io');
const socketadmin = require('@socket.io/admin-ui');
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

const logger =
  process.env.NODE_ENV === 'production'
    ? require('./src/config/productionLogger')
    : require('./src/config/devLogger');

// db setting
const session_db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SESSION_DATABASE,
};

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

app.use(express.static('public'));
app.use(express.json());
app.use(flash());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore(session_db),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

const passport = require('./src/config/passport/passport')(app);

app.use(morgan(morganFormat, { stream: logger.stream }));

// routing
const authRouter = require('./src/route/auth')(passport);
const scheduleRouter = require('./src/route/schedule');
const studytimeRouter = require('./src/route/studytime');
const todoRouter = require('./src/route/todo');
const friendRouter = require('./src/route/friend');

app.use('/auth', authRouter);
app.use('/schedule', scheduleRouter);
app.use('/studytime', studytimeRouter);
app.use('/todo', todoRouter);
app.use('/friend', friendRouter);

app.listen(process.env.SERVER_PORT, () => {
  logger.info(
    `Server On : http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`,
  );
});
