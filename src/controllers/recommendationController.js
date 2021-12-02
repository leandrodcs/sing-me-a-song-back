import { validadeRecommendation } from "../schemas/recommendationSchema.js";

async function postRecommendation(req, res) {
    const {
        name,
        youtubeLink,
    } = req.body;

    try {
        if (validadeRecommendation(req.body)) {
            return res.status(400).send(validadeRecommendation(req.body).message);
        }

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    res.send('opa');
}

export {
    postRecommendation,
};
