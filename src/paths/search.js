module.exports = function () {
  let operations = {
    POST,
  };

  function POST(req, res, next) {
    console.log(`About to add a search query: ${JSON.stringify(req.body)}`);
    res.status(200).send({
      status: "ok",
    });
  }

  POST.apiDoc = {
    summary: "Add search query to cache.",
    operationId: "search",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: "search_query",
        schema: {
          $ref: "#/definitions/Search",
        },
      },
    ],
    responses: {
      200: {
        description: "ok",
      },
      400: {
        description: '"search_query" is required',
      },
    },
  };

  return operations;
}