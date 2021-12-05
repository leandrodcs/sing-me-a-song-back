/* eslint-disable no-undef */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import RecommendationError from '../../src/errors/recommendationError.js';

const sut = recommendationService;

describe('Recommendations', () => {
    it('Expect to return the posted song data', async () => {
        const body = {
            id: '1',
            name: 'Test',
            youtubeLink: 'link',
            score: 0,
        };
        jest.spyOn(recommendationRepository, 'createRecommendation').mockImplementationOnce(() => body);
        const result = await sut.postRecommendation({ name: 'Test', youtubeLink: 'link' });
        expect(result).toEqual(body);
    });

    it('Expect RecommendationError for invalid recommendation id', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [null]);
        const promise = sut.voteRecommendation({ id: '1' });
        await expect(promise).rejects.toThrowError(RecommendationError);
    });

    it('Expect successful upvote message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: 0,
        }]);
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() => []);
        const result = await sut.voteRecommendation({ id: '1', vote: 'up' });
        expect(result).toBe('A pontuação da musica "test" mudou de 0 para 1');
    });

    it('Expect successful song removal message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: -5,
        }]);
        jest.spyOn(recommendationRepository, 'removeRecommendation').mockImplementationOnce(() => ({ name: 'test' }));
        const result = await sut.voteRecommendation({ id: '1', vote: 'down' });
        expect(result).toBe('A recomendação "test" foi removida pois chegou a uma pontuação muito baixa.');
    });

    it('Expect successful downvote message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: -4,
        }]);
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() => []);
        const result = await sut.voteRecommendation({ id: '1', vote: 'down' });
        expect(result).toBe('A pontuação da musica "test" mudou de -4 para -5');
    });
});
