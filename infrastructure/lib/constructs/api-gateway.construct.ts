import {
  AwsIntegration,
  Cors,
  LambdaIntegration,
  MethodOptions,
  MethodResponse,
  Model,
  RequestValidator,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { SubmitScoreModel } from "./submit-score-model.construct";

export class APIGatewayConstruct extends Construct {
  private _env: string | undefined = this.node.getContext("env") || "dev";
  private _lambdaAPIDist: string = "lambda/api/dist";
  private _apigw: RestApi;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const IPWhiteList = (process.env.IP_WHITELIST || "").split(",");

    this._apigw = new RestApi(this, id, {
      restApiName: `solaris-api-rest-${this._env}`,
      description: "Solaris API Gateway for webapp",
      defaultCorsPreflightOptions: {
        allowHeaders: Cors.DEFAULT_HEADERS,
        allowOrigins: IPWhiteList,
        allowMethods: Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });

    const roomsResource = this._apigw.root.addResource("rooms");
    const roomsDetailResource = roomsResource.addResource("{id}");
    const roomsDetailGame = roomsDetailResource.addResource("game");

    const getAllRoomsIntegration = this.getAllRoomsIntegration();
    const getRoomDetailIntegration = this.getRoomDetailIntegration();
    const joinRoomIntegration = this.joinRoomIntegration();

    roomsResource.addMethod("GET", getAllRoomsIntegration);
    roomsDetailResource.addMethod("GET", getRoomDetailIntegration);

    roomsDetailGame.addMethod("POST", joinRoomIntegration);
  }

  private getAllRoomsIntegration() {
    const getAllRoomsFn = new Function(this, `GetAllRoomsFn-${this._env}`, {
      runtime: Runtime.NODEJS_20_X,
      handler: "get-all-rooms.handler",
      functionName: `solaris-get-all-rooms-${this._env}`,
      code: Code.fromAsset(this._lambdaAPIDist),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
        ABLY_KEY: process.env.ABLY_KEY || "",
      },
    });

    return new LambdaIntegration(getAllRoomsFn);
  }

  private getRoomDetailIntegration() {
    const getRoomDetailFn = new Function(this, `GetRoomDetailFn-${this._env}`, {
      runtime: Runtime.NODEJS_20_X,
      handler: "get-room-detail.handler",
      functionName: `solaris-get-room-detail-${this._env}`,
      code: Code.fromAsset(this._lambdaAPIDist),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
        ABLY_KEY: process.env.ABLY_KEY || "",
      },
    });

    return new LambdaIntegration(getRoomDetailFn);
  }

  private joinRoomIntegration() {
    const joinRoomFn = new Function(this, `JoinRoomFn-${this._env}`, {
      runtime: Runtime.NODEJS_20_X,
      handler: "join-room.handler",
      functionName: `solaris-join-room-${this._env}`,
      code: Code.fromAsset(this._lambdaAPIDist),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
        ABLY_KEY: process.env.ABLY_KEY || "",
      },
    });

    return new LambdaIntegration(joinRoomFn);
  }

  public attachSubmitScoreSQS(integration: AwsIntegration) {
    const submitScoreModel = new SubmitScoreModel(
      this,
      `SolarisSubmitScoreModek-${this._env}`,
      this._apigw
    );

    const methodRespone: MethodResponse = {
      statusCode: "200",
      responseModels: { "application/json": Model.EMPTY_MODEL },
    };

    const methodOptions: MethodOptions = {
      methodResponses: [methodRespone],
      requestValidator: new RequestValidator(
        this,
        `SolarisSubmitScoreValidator-${this._env}`,
        {
          restApi: this._apigw,
          requestValidatorName: "body-validator",
          validateRequestBody: true,
        }
      ),
      requestModels: {
        "application/json": submitScoreModel.model,
      },
    };

    const roomDetailResource = this._apigw.root.getResource("rooms")?.getResource("{id}");

    if (!roomDetailResource) {
      throw new Error("Resource dont exist");
    }

    const scoreRoomDetailResource = roomDetailResource.addResource("score");

    scoreRoomDetailResource.addMethod("POST", integration, methodOptions);
  }
}
