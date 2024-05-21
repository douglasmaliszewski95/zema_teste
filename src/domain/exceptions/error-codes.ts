export const ErrorCodes = {
  //Generic
  REQ001: 'Invalid request',
  REQ002: 'File not provided in the request',
  ERR001: 'Internal Server Error',
  ERR002: 'Not Found',

  //Authentication
  AUT001: 'JWT Token is missing',
  AUT002: 'Invalid JWT Token',

  //Profile
  PRO001: 'Profile name already used',
  PRO002: 'You cannot delete a profile that has users',

  //User
  USR001: 'Incorrect password',
  USR002: 'Incorrect cpf/senha combination',
  USR003: 'Invalid Token',
  USR004: 'Expired Token',
  USR005: 'User not found with this token',
  USR006: 'User not found',
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
