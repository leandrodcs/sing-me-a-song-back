import express from 'express';
import cors from 'cors';

import * as recommendationController from './controllers/recommendationController.js';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/recommendations', recommendationController.postRecommendation);
app.post('/recommendations/:id/upvote', recommendationController.upvoteRecommendation);
app.post('/recommendations/:id/downvote', recommendationController.downvoteRecommendation);
app.get('/recommendations/top/:amount', recommendationController.getTopRecommendations);
app.get('/recommendations/random', recommendationController.getrandomRecommendation);

app.get('/health', (req, res) => {
    res.status(200).send('Server is up.');
});

app.use(serverMiddlewareError);

export default app;
