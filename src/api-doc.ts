const apiDoc = {
  swagger: '2.0',
  basePath: '/api/v1',
  info: {
    title: 'An in-memory cache analytics API.',
    version: '1.0.0'
  },
  definitions: {
    Analyse: {
      type: 'object',
      properties: {
        results: {
          type: 'object',
        },
        time: {
          type: 'string',
        },
      },
      required: ['results', 'time'],
    },
  },
  paths: {}
};

export default apiDoc;