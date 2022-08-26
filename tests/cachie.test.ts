import request from 'supertest';
import app from '../src/app';

jest.setTimeout(30000);

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

describe('Search', () => {
  it('should fail when search_query is missing', async (done) => {
    const payload = {
      search: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app).post('/api/v1/search').send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toMatch('"search_query" is required');
    done();
  });

  it('should fail when an unknown field is added', async () => {
    const payload = {
      search_query: "The quick brown fox jumps over the lazy dog",
      search: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app).post('/api/v1/search').send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toMatch('"search" is not allowed');
  });

  it('should successfully save a search', async () => {
    const payload = {
      search_query: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app).post('/api/v1/search').send(payload);
    expect(response.status).toBe(200);
    expect(response.body.status).toBeDefined();
    expect(response.body.status).toMatch("ok");
  });
});