import express from 'express';
import words from './api/words';
import trend from './api/trend';
import frequent_poster from './api/frequent_poster';
import forum_list from './api/forum_list';

const app = express();

app.use('/api',[words, trend, frequent_poster, forum_list]);

module.exports = app; 