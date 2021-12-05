/* eslint-disable no-undef */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import RecommendationError from '../../src/errors/recommendationError.js';
import AmountError from '../../src/errors/amountError.js';
import EmptyError from '../../src/errors/emptyError.js';

const sut = recommendationService;

describe('Recommendations', () => {
    it('Expects to return the posted song data', async () => {
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

    it('Expects RecommendationError for invalid recommendation id', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [null]);
        const promise = sut.voteRecommendation({ id: '1' });
        await expect(promise).rejects.toThrowError(RecommendationError);
    });

    it('Expects successful upvote message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: 0,
        }]);
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() => []);
        const result = await sut.voteRecommendation({ id: '1', vote: 'up' });
        expect(result).toBe('A pontuação da musica "test" mudou de 0 para 1');
    });

    it('Expects successful song removal message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: -5,
        }]);
        jest.spyOn(recommendationRepository, 'removeRecommendation').mockImplementationOnce(() => ({ name: 'test' }));
        const result = await sut.voteRecommendation({ id: '1', vote: 'down' });
        expect(result).toBe('A recomendação "test" foi removida pois chegou a uma pontuação muito baixa.');
    });

    it('Expects successful downvote message', async () => {
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{
            name: 'test',
            score: -4,
        }]);
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() => []);
        const result = await sut.voteRecommendation({ id: '1', vote: 'down' });
        expect(result).toBe('A pontuação da musica "test" mudou de -4 para -5');
    });

    it('Expects AmountError for invalid param', async () => {
        // jest.spyOn(global.Number).mockImplementationOnce(() => null);
        const promise = sut.getTopRecommendations({ amount: 0 });
        await expect(promise).rejects.toThrowError(AmountError);
    });

    it('Expects AmountError for invalid param', async () => {
        // jest.spyOn(global.Number).mockImplementationOnce(() => null);
        const promise = sut.getTopRecommendations({ amount: 1.1 });
        await expect(promise).rejects.toThrowError(AmountError);
    });

    it('Expects EmptyError for no recommendations found', async () => {
        // jest.spyOn(global.Number).mockImplementationOnce(() => null);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => []);
        const promise = sut.getTopRecommendations({ amount: 1 });
        await expect(promise).rejects.toThrowError(EmptyError);
    });

    it('Expects to receive a top recommendation', async () => {
        // jest.spyOn(global.Number).mockImplementationOnce(() => null);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{ name: 'test', youtubeLink: 'link' }]);
        const result = await sut.getTopRecommendations({ amount: 1 });
        expect(result).toEqual([{ name: 'test', youtubeLink: 'link' }]);
    });

    it('Expects EmptyError for no recommendations found', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => []);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => []);
        const promise = sut.getrandomRecommendation({ amount: 1 });
        await expect(promise).rejects.toThrowError(EmptyError);
    });

    it('Expects to receive a random bad recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0);
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0);
        jest.spyOn(global.Math, 'floor').mockImplementationOnce(() => 0);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{ name: 'test', youtubeLink: 'link' }]);
        const result = await sut.getrandomRecommendation();
        expect(result).toEqual({ name: 'test', youtubeLink: 'link' });
    });

    it('Expects to receive a random good recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 1);
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0);
        jest.spyOn(global.Math, 'floor').mockImplementationOnce(() => 0);
        jest.spyOn(recommendationRepository, 'listRecommendations').mockImplementationOnce(() => [{ name: 'test', youtubeLink: 'link' }]);
        const result = await sut.getrandomRecommendation();
        expect(result).toEqual({ name: 'test', youtubeLink: 'link' });
    });
});
