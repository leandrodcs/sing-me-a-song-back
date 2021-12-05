import express from 'express';
import cors from 'cors';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';
import recommendationsRouter from './routers/recommendationsRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/recommendations', recommendationsRouter);

app.get('/health', (req, res) => {
    res.status(200).send('Server is up.');
});

app.use(serverMiddlewareError);

export default app;
