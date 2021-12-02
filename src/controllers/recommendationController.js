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
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    postRecommendation,
};
