import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";


describe("Integration Tests", () => {
  test("Signup → Login → Access /me", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Flow User",
      email: "flow@test.com",
      password: "Password123",
    });

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "flow@test.com",
        password: "Password123",
      });

    const token = login.body.token;

    const me = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(me.statusCode).toBe(200);
  });

  test("Admin deactivates user → user login blocked", async () => {
    const admin = await request(app).post("/api/auth/signup").send({
      fullName: "Admin",
      email: "admin@test.com",
      password: "Password123",
    });

    await User.updateOne(
      { email: "admin@test.com" },
      { role: "admin" }
    );

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Password123",
      });

    const adminToken = adminLogin.body.token;

    await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Victim",
        email: "victim@test.com",
        password: "Password123",
      });

    const victim = await User.findOne({ email: "victim@test.com" });

    await request(app)
      .patch(`/api/users/${victim._id}/deactivate`)
      .set("Authorization", `Bearer ${adminToken}`);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "victim@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(403);
  });
});
