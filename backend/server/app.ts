/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import info from './routes/info';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/', session);
// app.use('/', register);
app.use('/', info);

export default app;