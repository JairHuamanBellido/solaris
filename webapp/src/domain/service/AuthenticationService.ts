import { cognitoUserPool } from "@/infrastructure/cognito";
import {
  AuthenticationDetails,
  CognitoUser,
  ICognitoUserData,
} from "amazon-cognito-identity-js";
import { cookies } from "next/headers";

export class AuthenticationService {
  static async auth({
    username,
    password,
  }: {
    username: string;
    password: string;
  }):Promise<any> {
    return new Promise((resolve, reject) => {
      const userData: ICognitoUserData = {
        Pool: cognitoUserPool,
        Username: username,
      };

      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          cookies().set("token", session.getIdToken().getJwtToken(), {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60, // 1 Hour expiration
          });
          resolve({
            success: true,
          });
        },
        onFailure: (error) => {
          resolve({
            error: true,
            errorMessage: "Credenciales inválidas.",
          });
        },
      });
    });
  }
}
