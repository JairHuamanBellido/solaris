import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { UsersService } from "../domain/services/UserService";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";
    const userId = jwtDecode(jwtToken).sub ?? "";

    const user = await UsersService.findById(userId);
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
