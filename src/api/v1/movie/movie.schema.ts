import { z } from "zod";

export const CreateMoviePayloadSchema = z.object({
  title: z.string(),
  release_year: z.number().int().min(1900).max(2023),
  director: z.string(),
  genre: z.enum([
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
  ]),
  plot: z.string(),
  runtime: z.number().int(),
  rating: z.number().int().min(0).max(5),
});

export const UpdateMoviePayloadSchema = z.object({
  title: z.string().optional(),
  release_year: z.number().int().min(1900).max(2023).optional(),
  director: z.string().optional(),
  genre: z
    .enum([
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
    ])
    .optional(),
  plot: z.string().optional(),
  runtime: z.number().int().optional(),
  rating: z.number().int().min(0).max(5).optional(),
});

export const CreateMovieReqSchema = z.object({
  body: CreateMoviePayloadSchema,
});

export const GetMoviesReqSchema = z.object({
  query: z.object({
    page: z.number().optional(),
    rating: z
      .number()
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n >= 0)
      .refine((n) => n <= 5),
    release_year: z
      .number()
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n >= 1900)
      .refine((n) => n <= 2023),
    genre: z
      .enum([
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
      ])
      .optional(),
  }),
});

export const UpdateMovieReqSchema = z.object({
  body: UpdateMoviePayloadSchema,
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type TNewMovie = z.infer<typeof CreateMoviePayloadSchema>;
export type TUpdateMovie = z.infer<typeof UpdateMoviePayloadSchema>;
