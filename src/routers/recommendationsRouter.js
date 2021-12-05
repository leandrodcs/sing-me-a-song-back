import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('', recommendationController.postRecommendation);
router.post('/:id/upvote', recommendationController.upvoteRecommendation);
router.post('/:id/downvote', recommendationController.downvoteRecommendation);
router.get('/top/:amount', recommendationController.getTopRecommendations);
router.get('/random', recommendationController.getrandomRecommendation);

export default router;
