class RecommendationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RecommendationError';
    }
}

export default RecommendationError;
