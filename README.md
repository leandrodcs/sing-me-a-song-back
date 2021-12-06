# API - Sing me a song

This API was made for people to share songs with each other. If you're tired of listening to the same songs over and over again, this API may just be what you've been looking for.

## Technologies

The following tools and frameworks were used in the construction of the project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'>
</p>


## About

This API doesn't require any kind of identification, it's sole purpose is to share songs between people. Songs can be shared and looked for, if you are looking for a song, you can do it by rating or randomly, all songs can be up voted up or down as well.

## Routes

- ### `POST /recommendations`

This route can be used to upload your song recommendation, it expects a body. The responses can vary between `201` for success, or `400` for an invalid body.

The expected body is like so:

```json
{
    "name": "Tenacious D - Dude",
    "youtubeLink": "https://www.youtube.com/watch?v=WTh-U3rK91o"
}
```

For a successful `201` post, the response will be the song that you just posted together with it's id and score, the default score of a newly added song will always be `0`.

```json
{
    "id": 4,
    "name": "Tenacious D - Dude",
    "youtubeLink": "https://www.youtube.com/watch?v=WTh-U3rK91o",
    "score": 0
}
```

For an unsuccessful `400` post, the response will include one of the following messages describing what is wrong with the requirement body.

```json
"Dados insuficientes.", "Insira um nome válido." or "Insira um link do youtube válido."
```

- ### `POST /recommendations/:id/upvote`

This route can be used to increase the rating of a recommendation by one, it expects no body and the responses can vary between `200` for success and `404` for no songs found for the given id informed via parameter.

For a successful upvote, the response will be like follows:

```json
"A pontuação da musica 'Californication' mudou de 28 para 29"
```

For an `404` error, the response will be:

```json
"`A recomendação de id 109 não existe."
```

- ### `POST /recommendations/:id/downvote`

This route can be used to decrease the rating of a recommendation by one, it expects no body as well and the responses can vary between `200` for success and `404` for no songs found for the given id informed via parameter.

For a successful upvote, the response will be like follows:

```json
"A pontuação da musica 'Californication' mudou de 28 para 27"
```

For an `404` error, the response will be:

```json
"A recomendação de id 109 não existe."
```

This route has a different response from the "upvote" route, it happens when a song has a score of "-5" and gets another downvote, in this case that song will be removed from the database. Further tries to down or up vote the removed song will receive a `404` error. The response for a removed song will be:

```json
"A recomendação 'Californication' foi removida pois chegou a uma pontuação muito baixa."
```

- ### `GET /recommendations/top/:amount`

This route can be used to get the top rated recommendations, it's length will depend on the given amount informed via parameter. The responses can be a `200` for success, `400` for an invalid amount, or `404` if no songs were found.

For a successful `200` response, with a amount = 2, the body returned will be something like so:

```json
[
  {
    "id": 3,
    "name": "Eminem - Lose Yourself",
    "youtubeLink": "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
    "score": 310
  },
  {
    "id": 1,
    "name": "Avenged Sevenfold - So Far Away",
    "youtubeLink": "https://www.youtube.com/watch?v=A7ry4cx6HfY",
    "score": 232
  }
]
```

For a `400` bad request, the response will be:

```json
"O valor informado deve ser um número inteiro maior que 0."
```

For a `404` status code, the response will be:

```json
"Nenhuma recomendação encontrada."
```

- ### `GET /recommendations/random`

This route can be used to get one random song. The responses can be a `200` for success or `404` if no songs were found.

For a successful `200` response, the body returned will be something like so:

```json
{
    "id": 3,
    "name": "Eminem - Lose Yourself",
    "youtubeLink": "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
    "score": 310
}
```

For a `404` status code, the response will be:

```json
"Nenhuma recomendação encontrada."
```

## Installation

1. Clone the this repo
```sh
git clone https://github.com/leandrodcs/sing-me-a-song-back.git
```
2. Install NPM packages
```sh
npm install
```
6. Create a database using the command below via postgres
```sh
CREATE DATABASE singmeasong
```
7. Inside the created database, create tables using the dump included in the back-end repo <a href="https://github.com/leandrodcs/sing-me-a-song-back/blob/main/dump.sql">here</a>.

8. Connect to the created database using the .env.example included in the back-end repo <a href="https://github.com/leandrodcs/sing-me-a-song-back/blob/main/.env.example">here</a>, to make it easy, name your .env file like so ".env.dev".

## Running

1. On the repo run the server connected to the database you just created using the following command.
```sh
npm run dev
```

## Developer

* [Leandro D. C. Schmidt ](https://github.com/leandrodcs)