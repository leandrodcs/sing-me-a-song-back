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

async function listRecommendations({ amount, rating }) {
    let query = 'SELECT id, name, youtube_link as "youtubeLink", score FROM recommendations';
    const queryArr = [];
    if (amount) {
        query += ' ORDER BY score DESC LIMIT $1;';
        queryArr.push(amount);
    }

    if (rating === 'good') {
        query += ' WHERE score > 10;';
    }

    if (rating === 'bad') {
        query += ' WHERE score <= 10;';
    }

    const result = await connection.query(query, queryArr);
    return result.rows;
}

export {
    createRecommendation,
    getRecommendation,
    updateScore,
    removeRecommendation,
    listRecommendations,
};
