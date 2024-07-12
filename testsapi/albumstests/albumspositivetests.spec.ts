import superagent from "superagent";

describe("Albums API Tests", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/albums";
  let albumId: any;

  it("should retrieve an album", async () => {
    const res = await superagent.get(`${BASE_URL}/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title");
    expect(res.body.userId).toBe(1);
    expect(res.body.id).toBe(1);
    expect(res.body.title).toBe("quidem molestiae enim");
  });

  it("should create a new album", async () => {
    const newAlbum = {
      userId: 1,
      title: "Test Album",
    };

    const res = await superagent.post(BASE_URL).send(newAlbum);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("userId", newAlbum.userId);
    expect(res.body).toHaveProperty("title", newAlbum.title);

    albumId = res.body.id;
  });

  it("should update an album", async () => {
    const updatedAlbum = {
      userId: 1,
      title: "Updated Test Album",
    };

    const res = await superagent.put(`${BASE_URL}/${albumId}`).send(updatedAlbum);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userId", updatedAlbum.userId);
    expect(res.body).toHaveProperty("title", updatedAlbum.title);
  });

  it("should delete an album", async () => {
    const res = await superagent.delete(`${BASE_URL}/${albumId}`);
    expect(res.status).toBe(200);

    // Verify that the album no longer exists
    const getRes = await superagent.get(`${BASE_URL}/${albumId}`).catch((err) => err.response);
    expect(getRes.status).toBe(404);
  });
});
