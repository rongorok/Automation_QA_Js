import superagent from "superagent";

describe("Albums API Tests", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/albums";
  let albumId: any;

  it("should return 404 for non-existent album", async () => {
    const res = await superagent.get(`${BASE_URL}/999999999`).catch((err) => err.response);
    expect(res.status).toBe(404);
  });

  it("should return 400 for invalid album creation", async () => {
    const invalidAlbum = {
      userId: "invalid", 
      title: "",
    };

    const res = await superagent.post(BASE_URL).send(invalidAlbum).catch((err) => err.response);
    expect(res.status).toBe(400);
  });

  it("should return 400 for invalid album update", async () => {
    const invalidAlbum = {
      userId: "invalid", 
      title: "",
    };

    const res = await superagent.put(`${BASE_URL}/1`).send(invalidAlbum).catch((err) => err.response);
    expect(res.status).toBe(400);
  });

  it("should return 404 for deleting non-existent album", async () => {
    const res = await superagent.delete(`${BASE_URL}/999999999`).catch((err) => err.response);
    expect(res.status).toBe(404);
  });

  it("should return 405 for invalid method", async () => {
    const res = await superagent.patch(`${BASE_URL}/1`).send({ title: "Invalid Method" }).catch((err) => err.response);
    expect(res.status).toBe(405);
  });
});
