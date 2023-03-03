import { PrismaClient, Genre } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedMovies(prisma: PrismaClient) {
  const movies = [];

  for (let i = 0; i < 10; i++) {
    movies.push({
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
  }

  await prisma.movie.createMany({
    data: [...movies],
  });
}
