import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function postRecommendation({ name, youtubeLink }) {
    return recommendationRepository.createRecommendation({ name, youtubeLink });
}

async function upvoteRecommendation({ id }) {
    const result = await recommendationRepository.getRecommendation({ id });

    const newScore = result.score + 1;

    const updatedScore = await recommendationRepository.updateScore({ id, newScore });

    return updatedScore;
}

async function downvoteRecommendation({ id }) {
    const result = await recommendationRepository.getRecommendation({ id });

    if (result.score < -4) {
        const recommendationRemoved = await recommendationRepository.removeRecommendation({ id });

        return `A recomendação "${recommendationRemoved.name}" foi removida pois chegou a uma pontuação muito baixa.`;
    }

    const newScore = result.score - 1;

    const updatedScore = await recommendationRepository.updateScore({ id, newScore });

    return updatedScore;
}

export {
    postRecommendation,
    upvoteRecommendation,
    downvoteRecommendation,
};
