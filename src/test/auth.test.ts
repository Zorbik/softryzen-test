import request from "supertest";
import app from "../app";
import {
  setupTestEnvironment,
  tearDownTestEnvironment,
  testRegDelUserDto,
} from "./testsSetup";

beforeAll(async () => {
  await setupTestEnvironment();
});

afterAll(async () => {
  await tearDownTestEnvironment();
});

describe("User authentication", () => {
  let createdId: string;
  let token: string;

  it("should register a new user", async () => {
    const { body } = await request(app)
      .post("/register")
      .send(testRegDelUserDto)
      .expect(201);

    createdId = body.user._id;
    token = body.user.tokens.accessToken;
    return expect(createdId).toBeDefined();
  });

  it("should not register a user with an existing email", async () => {
    const { body } = await request(app)
      .post("/register")
      .send(testRegDelUserDto)
      .expect(409);

    expect(body.message).toEqual("Email in use");
  });

  it("should login a user with valid email and password", async () => {
    const { body } = await request(app)
      .post("/login")
      .send({
        email: testRegDelUserDto.email,
        password: testRegDelUserDto.password,
      })
      .expect(200);

    return expect(body.user._id).toBeDefined();
  });

  it("should not login a user with not valid email or password", async () => {
    const { body } = await request(app)
      .post("/login")
      .send({ email: testRegDelUserDto.email, password: "123456789" })
      .expect(401);

    return expect(body.message).toMatch(/wrong/i);
  });

  it("should delete a user", async () => {
    const { body } = await request(app)
      .delete(`/user/id/${createdId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    return expect(body.message).toMatch(/success/i);
  });
});
