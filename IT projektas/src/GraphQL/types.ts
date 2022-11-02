export enum GraphQLErrorCodes {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
}

export enum GraphQLErrorMessages {
  UNAUTHORIZED = 'You are not authorized to perform this action.',
  UNAUTHENTICATED = 'You need to login to perform this action.',
  INVALID_CREDENTIALS = 'Invalid credentials.',
  RATE_LIMIT_EXCEEDED = 'You have exceeded the limit of requests. Please wait for some time and try again.',
  GENERIC = 'Something bad happened while executing your query, please try again later.',
}
