import express from 'express';
import words from './api/words';
import trend from './api/trend';
import frequent_poster from './api/frequent_poster';
import forum_list from './api/forum_list';
import mail_keywords from './api/mail_keywords';
import keyword_mail_addr from './api/keyword_mail_addr';
import stream_line from './api/stream_line';

const app = express();

app.use('/api',[words, trend, frequent_poster, forum_list, mail_keywords, keyword_mail_addr, stream_line]);

module.exports = app; 