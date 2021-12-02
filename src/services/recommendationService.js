import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function postRecommendation({ name, youtubeLink }) {
    return recommendationRepository.createRecommendation({ name, youtubeLink });
}

export {
    postRecommendation,
};
