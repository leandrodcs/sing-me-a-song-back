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
    const result = await connection.query(`
    UPDATE
        recommendations
    SET
        score = $1
    WHERE
        id = $2
    RETURNING
        *
    ;`, [newScore, id]);
    console.log(result.rows);

    return result.rows[0];
}

export {
    createRecommendation,
    getRecommendation,
    updateScore,
};
