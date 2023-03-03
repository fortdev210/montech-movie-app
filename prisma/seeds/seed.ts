import { PrismaClient } from "@prisma/client";
import { seedMovies } from "./movie.seed";

function main() {
  const client = new PrismaClient();
  seedMovies(client);
}

main();
