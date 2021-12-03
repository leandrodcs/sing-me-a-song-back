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

async function getRecommendation({ id }) {
    const result = await connection.query(`
    SELECT
        *
    FROM
        recommendations
    WHERE
        id = $1
    ;`, [id]);

    return result.rows[0];
}

async function updateScore({ id, newScore }) {
    await connection.query(`
    UPDATE
        recommendations
    SET
        score = $1
    WHERE
        id = $2
    ;`, [newScore, id]);
}

async function removeRecommendation({ id }) {
    const result = await connection.query('DELETE FROM recommendations WHERE id = $1 RETURNING *;', [id]);

    return result.rows[0];
}

export {
    createRecommendation,
    getRecommendation,
    updateScore,
    removeRecommendation,
};
