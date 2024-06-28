import { CognitoUserPool } from "amazon-cognito-identity-js";

export const cognitoUserPool = new CognitoUserPool({
  ClientId: process.env.COGNITO_CLIENT_ID || "",
  UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
});
