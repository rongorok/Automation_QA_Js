import superagent from 'superagent';

import test, { expect } from "@playwright/test";

test.describe('API Tests for JSONPlaceholder', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

   // GET Tests
   test('GET /posts should return a list of posts', async () => {
    const response = await superagent.get(`${BASE_URL}/posts`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 should return the first post with correct data', async () => {
    const response = await superagent.get(`${BASE_URL}/posts/1`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body).toHaveProperty('title');
  });

  test('GET /posts?userId=1 should return posts by userId', async () => {
    const response = await superagent.get(`${BASE_URL}/posts`).query({ userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body.every(post => post.userId === 1)).toBe(true);
  });

  // POST Tests
  test('POST /posts should create a new post and return it with an ID', async () => {
    const newPost = {
      title: 'New Post',
      body: 'This is a new post',
      userId: 1
    };
    const response = await superagent.post(`${BASE_URL}/posts`).send(newPost);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Post');
    expect(response.body).toHaveProperty('id');
  });

  test('POST /posts with missing fields should return a bad request', async () => {
    try {
      await superagent.post(`${BASE_URL}/posts`).send({ title: 'Incomplete Post' });
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  test('POST /posts with extra fields should still create a new post', async () => {
    const newPost = {
      title: 'Extra Fields',
      body: 'This post has extra fields',
      userId: 1,
      extraField: 'This should not affect creation'
    };
    const response = await superagent.post(`${BASE_URL}/posts`).send(newPost);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.extraField).not.toBeUndefined();
  });

  // PUT Tests
  test('PUT /posts/1 should update an existing post and return the updated post', async () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Post Title',
      body: 'Updated Post Body',
      userId: 1
    };
    const response = await superagent.put(`${BASE_URL}/posts/1`).send(updatedPost);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Post Title');
    expect(response.body.body).toBe('Updated Post Body');
  });

  test('PUT /posts/99999 should return 500 for updating non-existent post', async () => {
    try {
      const updatedPost = {
        title: 'Non-Existent Post',
        body: 'This should not work',
        userId: 1
      };
      await superagent.put(`${BASE_URL}/posts/99999`).send(updatedPost);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  test('PUT /posts/1 with missing fields should affect unchanged fields', async () => {
    const partialUpdate = {
      title: 'Partially Updated Title'
    };
    const response = await superagent.put(`${BASE_URL}/posts/1`).send(partialUpdate);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Partially Updated Title');
    expect(response.body.body).toBeUndefined();
  });

  // PATCH Tests
  test('PATCH /posts/1 should partially update a post', async () => {
    const partialUpdate = {
      title: 'Partially Updated Title'
    };
    const response = await superagent.patch(`${BASE_URL}/posts/1`).send(partialUpdate);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Partially Updated Title');
  });

  test('PATCH /posts/99999 should return 404 for patching non-existent post', async () => {
    try {
      const partialUpdate = {
        title: 'Non-Existent Post'
      };
      await superagent.patch(`${BASE_URL}/posts/99999`).send(partialUpdate);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('PATCH /posts/1 with empty body should not change the post', async () => {
    const initialResponse = await superagent.get(`${BASE_URL}/posts/1`);
    const response = await superagent.patch(`${BASE_URL}/posts/1`).send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(initialResponse.body);
  });

  // DELETE Tests
  test('DELETE /posts/1 should delete a post and return an empty response', async () => {
    const response = await superagent.delete(`${BASE_URL}/posts/1`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  test('DELETE /posts/99999 should return 404 for deleting non-existent post', async () => {
    try {
      await superagent.delete(`${BASE_URL}/posts/99999`);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('DELETE /posts/1 twice should return 404 the second time', async () => {
    await superagent.delete(`${BASE_URL}/posts/1`);
    try {
      await superagent.delete(`${BASE_URL}/posts/1`);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});