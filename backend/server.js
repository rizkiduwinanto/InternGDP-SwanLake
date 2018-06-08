import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import http from 'http';
import config from './config';
import init_socket_io from './middlewares/socket';

const app = express();
const server = http.createServer(app);

// TODO :
// - Refactor middlewares/bigquery.js

// now we should configure the API to use bodyParser and look for JSON data in the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Initialize socket io
init_socket_io(server);

// Routing
app.use('/', require('./controller'));

// Fire up the server on spesific port
server.listen(config.API_PORT, config.API_ADDR, () => console.log(`Listening on port ${config.API_PORT}`));




