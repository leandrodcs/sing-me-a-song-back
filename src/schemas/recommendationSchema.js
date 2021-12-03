import Joi from 'joi';

const validadeRecommendation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        youtubeLink: Joi.string().regex(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/).required(),
    }).unknown();
    if (schema.validate(data).error) {
        const { message } = schema.validate(data).error;
        if (message.includes('name')) return 'Insira um nome válido';
        if (message.includes('youtubeLink')) return 'Insira um link do youtube válido';
    } else {
        return false;
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    validadeRecommendation,
};
