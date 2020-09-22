# Message board data store API

An API to store threads and comments. It allows people to register as users of the API and store their posts in the API.

The API allows users to post, edit, or delete their posts.

## API URL

```js
production: 'https://fakebook-of-pandas.herokuapp.com/'
```

## API End Points

| Verb   | URI Pattern            |
|--------|------------------------|
| POST   | `/sign-up`             |
| POST   | `/sign-in`             |
| DELETE | `/sign-out`            |
| PATCH  | `/change-password`     |
| GET    | `/threads`             |
| POST   | `/threads`             |
| GET    | `/threads/:id`         |
| PATCH  | `/threads/:id`         |
| DELETE | `/threads/:id`         |
| POST   | `/comments`            |
| PATCH  | `/comments/:id`        |
| DELETE | `/comments/:id`        |

All data returned from API actions is formatted as JSON.

## Disclaimer

This API may be reset or altered at anytime. The future of this API may not
align with the current state and therefore the state your client application
expects. If you would like to maintain a version of this API in its current
state for your future use, please fork and clone the repository and launch it
on heroku.
