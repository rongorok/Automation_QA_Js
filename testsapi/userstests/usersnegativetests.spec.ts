import superagent from "superagent";

describe("Users API Tests", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/users";
  let userId: any;

  it("should return 404 for non-existent user", async () => {
    const res = await superagent.get(`${BASE_URL}/999999999`).catch((err) => err.response);
    expect(res.status).toBe(404);
  });

  it("should return 400 for invalid user creation", async () => {
    const invalidUser = {
      name: "",
      username: "invaliduser",
      email: "invalidemail",
    };

    const res = await superagent.post(BASE_URL).send(invalidUser).catch((err) => err.response);
    expect(res.status).toBe(400);
  });

  it("should return 400 for invalid user update", async () => {
    const invalidUser = {
      name: "",
      username: "invaliduser",
      email: "invalidemail",
    };

    const res = await superagent.put(`${BASE_URL}/1`).send(invalidUser).catch((err) => err.response);
    expect(res.status).toBe(400);
  });

  it("should return 404 for deleting non-existent user", async () => {
    const res = await superagent.delete(`${BASE_URL}/999999999`).catch((err) => err.response);
    expect(res.status).toBe(404);
  });

  it("should return 405 for invalid method", async () => {
    const res = await superagent.patch(`${BASE_URL}/1`).send({ name: "Invalid Method" }).catch((err) => err.response);
    expect(res.status).toBe(405);
  });
});
