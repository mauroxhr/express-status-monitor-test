var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var expressStatusmonitor = require("express-status-monitor");
var morgan = require('morgan');

var app = express();

// Middleswares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// config
const config = {
healthChecks: [{
protocol: 'http',
host: 'localhost',
path: '/admin/health/ex1',
port: '3000'
}, {
protocol: 'http',
host: 'localhost',
path: '/admin/health/ex2',
port: '3000'
}]
}
app.use(expressStatusmonitor(config));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Config
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/admin/health/ex1', (req, res) => {
    res.status(200).send('ok')
})

app.listen(3000, () => {
console.log("Conectado al puerto 3000");
});
