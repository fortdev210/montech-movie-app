import supertest from "supertest";
import { server } from "../src/server";
import { faker } from "@faker-js/faker";
import { Genre } from "@prisma/client";

describe("MONTECH MOVIE API TEST", () => {
  beforeAll(() => {
    return new Promise((resolve, reject) => {
      server.on("listening", resolve);
    });
  });

  beforeEach(() => {
    server.close();
  });

  afterEach(() => {
    server.close();
  });

  let movieId = "";
  it("should add a new movie", async () => {
    const response = await supertest(server)
      .post("/api/v1/movies/add")
      .send({
        title: faker.lorem.words(),
        genre: faker.helpers.arrayElement([
          "action",
          "adventure",
          "animation",
          "comedy",
          "crime",
          "documentary",
          "drama",
          "family",
          "fantasy",
          "horror",
          "musical",
          "mystery",
          "romance",
          "science_fiction",
          "thriller",
          "war",
          "western",
          "other",
        ]) as Genre,
        director: faker.name.fullName(),
        release_year: faker.date.past(3).getFullYear(),
        plot: faker.lorem.paragraphs(),
        runtime: faker.datatype.number({
          min: 30,
          max: 200,
          precision: 1,
        }),
        rating: faker.datatype.number({
          min: 0,
          max: 5,
          precision: 1,
        }),
      });

    expect(response.status).toBe(201);
    movieId = response.body.data.id;
  }, 10000);

  it("should return list of movies by pagination", async () => {
    const response = await supertest(server)
      .get("/api/v1/movies/list?page=1")
      .send();
    expect(response.status).toBe(200);
  }, 10000);

  it("should update a movie", async () => {
    const response = await supertest(server)
      .patch(`/api/v1/movies/${movieId}`)
      .send({
        director: faker.name.fullName(),
        release_year: faker.date.past(3).getFullYear(),
        rating: faker.datatype.number({
          min: 0,
          max: 5,
          precision: 1,
        }),
      });

    expect(response.status).toBe(200);
    movieId = response.body.data.id;
  }, 10000);

  it("should delete a movie", async () => {
    const response = await supertest(server)
      .delete(`/api/v1/movies/${movieId}`)
      .send();

    expect(response.status).toBe(200);
  }, 10000);
});
