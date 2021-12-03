import * as recommendationRepository from '../repositories/recommendationRepository.js';
import RecommendationError from '../errors/recommendationError.js';

async function postRecommendation({ name, youtubeLink }) {
    return recommendationRepository.createRecommendation({ name, youtubeLink });
}

async function voteRecommendation({ id, vote }) {
    const result = await recommendationRepository.getRecommendation({ id });

    if (!result) {
        throw new RecommendationError(`A recomendação de id ${id} não existe.`);
    }

    if (vote === 'up') {
        const newScore = result.score + 1;
        const updatedScore = await recommendationRepository.updateScore({ id, newScore });

        return updatedScore;
    }

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
    voteRecommendation,
};
