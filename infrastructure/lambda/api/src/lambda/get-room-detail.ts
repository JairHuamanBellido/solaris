import { APIGatewayEvent } from "aws-lambda";
import { RoomsServices } from "../domain/services/RoomsService";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters as { id: string };

    const room = await RoomsServices.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(room),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
    };
  }
};
