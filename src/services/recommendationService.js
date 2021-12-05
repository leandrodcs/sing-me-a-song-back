import * as recommendationRepository from '../repositories/recommendationRepository.js';
import RecommendationError from '../errors/recommendationError.js';
import AmountError from '../errors/amountError.js';
import EmptyError from '../errors/emptyError.js';

async function postRecommendation({ name, youtubeLink }) {
    return recommendationRepository.createRecommendation({ name, youtubeLink });
}

async function voteRecommendation({ id, vote }) {
    const results = await recommendationRepository.listRecommendations({ id });
    const result = results[0];

    if (!result) {
        throw new RecommendationError(`A recomendação de id ${id} não existe.`);
    }

    const { name, score } = result;

    if (vote === 'up') {
        const newScore = result.score + 1;
        await recommendationRepository.updateScore({ id, newScore });

        return `A pontuação da musica "${name}" mudou de ${score} para ${newScore}`;
    }

    if (result.score < -4) {
        const recommendationRemoved = await recommendationRepository.removeRecommendation({ id });

        return `A recomendação "${recommendationRemoved.name}" foi removida pois chegou a uma pontuação muito baixa.`;
    }

    const newScore = result.score - 1;
    await recommendationRepository.updateScore({ id, newScore });

    return `A pontuação da musica "${name}" mudou de ${score} para ${newScore}`;
}

async function getTopRecommendations({ amount }) {
    const quantity = Number(amount);
    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
        throw new AmountError('O valor informado deve ser um número inteiro maior que 0');
    }

    const topRecommendations = await recommendationRepository.listRecommendations({ amount });

    if (!topRecommendations.length) {
        throw new EmptyError('Nenhuma recomendação encontrada :(');
    }

    return topRecommendations;
}

async function getrandomRecommendation() {
    const getHighRatedSong = Math.random() >= 0.3;
    let rating = 'bad';

    if (getHighRatedSong) {
        rating = 'good';
    }

    let recommendations = await recommendationRepository.listRecommendations({ rating });

    if (!recommendations.length) {
        recommendations = await recommendationRepository.listRecommendations({});
    }

    if (!recommendations.length) {
        throw new EmptyError('Nenhuma recomendação encontrada :(');
    }
    const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    return recommendation;
}

export {
    postRecommendation,
    voteRecommendation,
    getTopRecommendations,
    getrandomRecommendation,
};
