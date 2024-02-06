
# Christopher Nolan movies API

This project is a efficient API developed using Node.js and  MongoDB as its database.

One of the key features of this API is its use of the Zod library for backend field validation. Zod is a TypeScript and JavaScript library for creating, parsing, and validating schemas. It’s used in this project to ensure the integrity of the data being handled by the API, providing an extra layer of security and reliability.

Feel free to contribute or use this as a reference for your own projects! Enjoy coding!
## API Reference

#### Get all movies

```http
  GET /api/movies
```



#### Get movie by ID

```http
  GET /api/movies/<movie_id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to fetch |


#### Create a movie

```http
  POST /api/movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**|
| `year`      | `number` | **Required**. Integer betweem 1900 and 2024|
| `director`      | `string` | **Required**|
| `poster`      | `url` | **Required**. A valid url to create movie|
| `genre`      | `array` | **Required**. Array of options: Action, Adventure, Comedy, Drama,   Horror, Sci-Fi, Thriller, Fantasy, Terror, Crime, Mystery, History, Biography'|
| `rate`      | `number` | **Required**. Min 0 - Max 10|

#### Delete movie by ID

```http
  DELETE /api/movies/<movie_id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to delete |

#### Update movie by ID

```http
  DELETE /api/movies/<movie_id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to update |

