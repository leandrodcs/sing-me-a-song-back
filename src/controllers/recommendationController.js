/* eslint-disable no-console */
import { validadeRecommendation } from '../schemas/recommendationSchema.js';
import * as recommendationService from '../services/recommendationService.js';

async function postRecommendation(req, res) {
    const {
        name,
        youtubeLink,
    } = req.body;

    try {
        if (!name || !youtubeLink) {
            res.status(400).send('Dados insuficientes');
        }

        if (validadeRecommendation(req.body)) {
            return res.status(400).send(validadeRecommendation(req.body));
        }

        const recommendation = await recommendationService
            .postRecommendation({ name, youtubeLink });

        res.status(201).send(recommendation);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function upvoteRecommendation(req, res) {
    const { id } = req.params;
    try {
        const updatedScore = await recommendationService.upvoteRecommendation({ id });

        res.status(200).send(updatedScore);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    postRecommendation,
    upvoteRecommendation,
};
