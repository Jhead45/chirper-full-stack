import 'babel-polyfill';
import { join } from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(morgan('dev'));
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});












