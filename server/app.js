import bodyParser from 'body-parser';
import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.js'
import mongooseConnect from './db/index.js';

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

app.use('/', router); 

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
