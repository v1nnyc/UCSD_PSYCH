
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var instructions = require('./routes/instructions')
var distractor = require('./routes/distractor')
var tetris = require('./routes/tetris')
var lineupinstructions = require('./routes/lineupinstructions')
var lineup = require('./routes/lineup')
var stimQuestions = require('./routes/stimQuestions')
var demographics = require('./routes/demographics')
var debrief = require('./routes/debrief')
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/instructions', instructions.view);
app.get('/distractor', distractor.view)
app.get('/tetris', tetris.view)
app.get('/lineupinstructions', lineupinstructions.view)
app.get('/lineup', lineup.view)
app.get('/stimQuestions', stimQuestions.view)
app.get('/demographics', demographics.view)
app.get('/debrief', debrief.view)
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
