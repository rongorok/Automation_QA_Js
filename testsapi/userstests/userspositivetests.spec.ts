import superagent from "superagent";

describe("Users API Tests", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/users";
  let userId: any;

  it("should retrieve a user", async () => {
    const res = await superagent.get(`${BASE_URL}/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("email");
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      address: {
        street: "Test Street",
        suite: "Apt. 123",
        city: "Test City",
        zipcode: "12345-6789",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "testuser.org",
      company: {
        name: "Test Company",
        catchPhrase: "Test Catch Phrase",
        bs: "Test BS",
      },
    };

    const res = await superagent.post(BASE_URL).send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name", newUser.name);
    expect(res.body).toHaveProperty("username", newUser.username);
    expect(res.body).toHaveProperty("email", newUser.email);

    userId = res.body.id;
  });

  it("should update a user", async () => {
    const updatedUser = {
      name: "Updated Test User",
      username: "updatedtestuser",
      email: "updatedtestuser@example.com",
    };

    const res = await superagent.put(`${BASE_URL}/${userId}`).send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", updatedUser.name);
    expect(res.body).toHaveProperty("username", updatedUser.username);
    expect(res.body).toHaveProperty("email", updatedUser.email);
  });

  it("should delete a user", async () => {
    const res = await superagent.delete(`${BASE_URL}/${userId}`);
    expect(res.status).toBe(200);

    // Verify that the user no longer exists
    const getRes = await superagent.get(`${BASE_URL}/${userId}`).catch((err) => err.response);
    expect(getRes.status).toBe(404);
  });
});
