class AmountError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AmountError';
    }
}

export default AmountError;
