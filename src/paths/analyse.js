module.exports = function () {
  let operations = {
    GET,
  };

  function GET(req, res, next) {
    res.status(200).json([
      {
        results: {
          "the quick": 0,
          "lazy dog": 0,
          the: 0
        },
        time: "2ms"
      },
    ]);
  }

  GET.apiDoc = {
    summary: "Analyse query token.",
    operationId: "analyse",
    parameters: [
      {
        in: "query",
        name: "analysis_token",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Result of analysis",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Analyse",
          },
        },
      },
      400: {
        description: '"analysis_token" is required',
      },
    },
  };

  return operations;
}