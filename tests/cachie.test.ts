import request from 'supertest';
import app from '../src/app';

jest.setTimeout(30000);

describe('Search', () => {
  it('should fail when search_query is missing', async () => {
    const payload = {
      search: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app)
    .post('/api/v1/search')
    .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toMatch('"search_query" is required');
  });

  it('should fail when an unknown field is added', async () => {
    const payload = {
      search_query: "The quick brown fox jumps over the lazy dog",
      search: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app)
    .post('/api/v1/search')
    .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toMatch('"search" is not allowed');
  });

  it('should successfully save a search', async () => {
    const payload = {
      search_query: "The quick brown fox jumps over the lazy dog"
    }

    const response = await request(app)
    .post('/api/v1/search')
    .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.status).toBeDefined();
    expect(response.body.status).toMatch("ok");
  });
});

describe('Analyse', () => {
  it('should fail when analysis_token is missing', async () => {
    const response = await request(app)
    .get(`/api/v1/analyse`);
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch('"analysis_token" is required');
  });

  it('should fail when analysis_token is empty', async () => {
    const response = await request(app)
    .get(`/api/v1/analyse?analysis_token=`);
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch('"analysis_token" is not allowed to be empty');
  });

  it('should return results for a valid analysis_token', async () => {
    const analysis_token = "the quick,lazy dog,the";

    const response = await request(app)
    .get(`/api/v1/analyse?analysis_token=${analysis_token}`);
    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.time).toBeDefined();
  });
});