import { GraphQLErrorCodes } from '#GraphQL';

export const HttpStatusCodePlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        switch (response?.errors?.[0]?.extensions?.code) {
          case GraphQLErrorCodes.RATE_LIMIT_EXCEEDED:
            return (response.http.status = 429);
          case GraphQLErrorCodes.AUTHENTICATION_ERROR:
            return (response.http.status = 401);
          case GraphQLErrorCodes.UNAUTHORIZED:
            return (response.http.status = 403);
          case GraphQLErrorCodes.NOT_FOUND:
            return (response.http.status = 404);
          case GraphQLErrorCodes.BAD_REQUEST:
            return (response.http.status = 400);
          default:
            return;
        }
      },
    };
  },
};
