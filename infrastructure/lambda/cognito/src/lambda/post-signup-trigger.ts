import { PostConfirmationConfirmSignUpTriggerEvent } from "aws-lambda";
import { UsersService } from "../domain/services/UsersService";

export const handler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
  context: any,
  callback: any
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { sub, preferred_username, given_name, email } =
      event.request.userAttributes;

    await UsersService.create({
      id: sub,
      email: email,
      name: given_name,
      username: preferred_username,
    });

    callback(null, event);
  } catch (error) {
    callback(error, event);
  }
};
