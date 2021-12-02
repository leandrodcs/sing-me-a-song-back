import Joi from 'joi';

const validadeRecommendation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        youtubeLink: Joi.string().regex(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/).required(),
    }).unknown();
    return schema.validate(data).error;
};

export {
    validadeRecommendation,
};
