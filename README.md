# Cachie

Cachie provides us the ability to know how many times a word or a combination of words have been queried since the engine has been running. The server exposes 2 endpoints:

1. `POST /search` - which accepts a search query of at least a word.
2. `GET /analyse` - which accepts a comma separated series of one or two words that we call the Analysis token. It returns the number of times the analysis token was found in previous search query and the time it took to complete the analysis process.

The table below describes the request and response of the two endpoints:

| Endpoint | Request | Success Response |
| --- | --- | --- |
| POST /search | { search_query: "The quick brown fox jumps over the lazy dog" } | { status: "ok" } |
| GET /analyse | ?analysis_token=the quick,lazy dog,the | { "results": { "the quick": 1, "lazy dog": 1, the: 2 }, "time": 80ms } |

To illustrate the behaviour, here is an example:

1. `POST /search - { search_query: "The quick brown fox jumps over the lazy dog" }` - returns `{ status: "ok" }`
2. `POST /search - { search_query: "The quick lion had mercy on the deer" }` - returns `{ status: "ok" }`
3. `POST /search - { search_query: "The quick zebra outran the cheetah" }` - returns `{ status: "ok" }`
4. `GET /analyse?analysis_token=the quick,the` - returns `{ "results": { "the quick": 3, "the": 6 }, "time": 80ms }`.
    1. Explanation: “the quick” appeared **together** three times across the search queries and “the” appeared six times across the search queries. The time it took between when the request was received and when the response was sent to the client took 80ms.


# How to run Cachie API

1. Clone the Github repository
2. `npm install`
3. Create a `.env` file and add the environment variables found in `.env.example`
4. Run the API using the following command: `npm run dev`
5. While Cachie API is running, visit `http://localhost:3000/api-documentation/` to view documentation
6. To run tests, set `NODE_ENV=test` in env and run the following command: `npm test`