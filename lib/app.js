import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import characterController from './controllers/characters.js';
import userController from './controllers/users.js';

const app = express();

app.use(express.json());

app.use(characterController);
app.use(userController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
