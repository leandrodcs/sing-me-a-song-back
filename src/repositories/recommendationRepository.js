import connection from '../database/database.js';

async function createRecommendation({ name, youtubeLink }) {
    const result = await connection.query(`
    INSERT INTO
        recommendations
        (name, youtube_link)
    VALUES
        ($1, $2)
    RETURNING
        *
    ;`, [name, youtubeLink]);
    return result.rows[0];
}

export {
    createRecommendation,
};
