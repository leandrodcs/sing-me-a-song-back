/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export default async function serverError(err, req, res, next) {
    console.log(err);
    return res.sendStatus(500);
}
