import request from "supertest";
import app from "../app";
import {
  setupTestEnvironment,
  tearDownTestEnvironment,
  testRegDelMovieDto,
} from "./testsSetup";

const testLoginDto = {
  email: "testLogIn@test.com",
  password: "test123@",
};
beforeAll(async () => {
  await setupTestEnvironment();
});

afterAll(async () => {
  await tearDownTestEnvironment();
});

describe("Movies", () => {
  let accessToken: string;
  let movieId: string;

  beforeEach(async () => {
    const { body } = await request(app).post("/login").send(testLoginDto);
    accessToken = body.user.tokens.accessToken;
  });

  afterEach(async () => {
    await request(app)
      .post("/logout")
      .set("Authorization", `Bearer ${accessToken}`);
  });

  it("should get all movies", async () => {
    const { body } = await request(app)
      .get("/movies")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    movieId = body.movies[0]._id;
    return expect(body.movies).toBeDefined();
  });

  it("should not get movies without authentication", async () => {
    const { body } = await request(app).get("/movies").expect(401);

    return expect(body.message).toMatch(/token/i);
  });

  it("should get movie by ID", async () => {
    const { body } = await request(app)
      .get(`/movies/id/${movieId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    return expect(body.movie).toBeDefined();
  });

  it("should add new movie", async () => {
    const { body } = await request(app)
      .post(`/movies`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(testRegDelMovieDto)
      .expect(200);

    movieId = body.movie._id;

    return expect(body.movie).toBeDefined();
  });

  it("should change movie info", async () => {
    const { body } = await request(app)
      .patch(`/movies/id/${movieId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ ...testRegDelMovieDto, title: "123" })
      .expect(200);

    return expect(body.movie.title).toBe("123");
  });

  it("should get an error", async () => {
    const { body } = await request(app)
      .patch(`/movies/id/${movieId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "123" })
      .expect(400);

    return expect(body.message).toMatch(/required/i);
  });

  it("should delete a movie", async () => {
    const { body } = await request(app)
      .delete(`/user/id/${movieId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    return expect(body.message).toMatch(/success/i);
  });
});
