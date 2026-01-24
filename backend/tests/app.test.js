import request from "supertest";
import app from "../src/app.js";

describe("API", () => {
  it("retorna status ok", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("faz login com sucesso", async () => {
    const response = await request(app).post("/api/login").send({
      email: "lara@yoga.com",
      password: "123456"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("bloqueia perfil sem token", async () => {
    const response = await request(app).get("/api/profile");
    expect(response.statusCode).toBe(401);
  });
});
