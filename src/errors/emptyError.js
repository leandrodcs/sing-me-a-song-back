class EmptyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmptyError';
    }
}

export default EmptyError;
