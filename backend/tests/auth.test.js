import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import mongoose from "mongoose";


describe("Auth API Tests", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test("Signup succeeds with valid data", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("Duplicate signup is blocked", async () => {
    await User.create({
      fullName: "Test",
      email: "dup@test.com",
      password: "hashed",
    });

    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test",
        email: "dup@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(409);
  });

  test("Login fails with wrong password", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Login User",
      email: "login@test.com",
      password: "Password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "WrongPass",
      });

    expect(res.statusCode).toBe(401);
  });

  test("Inactive user cannot login", async () => {
    const user = await request(app).post("/api/auth/signup").send({
      fullName: "Inactive User",
      email: "inactive@test.com",
      password: "Password123",
    });

    await User.updateOne(
      { email: "inactive@test.com" },
      { status: "inactive" }
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "inactive@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(403);
  });

  test("Password is never returned", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Safe User",
        email: "safe@test.com",
        password: "Password123",
      });

    expect(res.body.user.password).toBeUndefined();
  });
});
