import { JsonSchemaType, Model, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class SubmitScoreModel extends Construct {
  private _env: string | undefined = this.node.getContext("env") || "dev";

  readonly model: Model;
  constructor(scope: Construct, id: string, restApi: RestApi) {
    super(scope, id);

    this.model = new Model(
      this,
      `solaris-submit-score-validation-${this._env}`,
      {
        restApi: restApi,
        contentType: "application/json",
        description: "Validate the user score selection",
        modelName: `SolarisSubmitScoreValidation${this._env}`,
        schema: {
          type: JsonSchemaType.OBJECT,
          required: ["roomId", "userId", "score"],
          properties: {
            roomId: {
              type: JsonSchemaType.STRING,
            },
            userId: {
              type: JsonSchemaType.STRING,
            },
            score: {
              type: JsonSchemaType.NUMBER,
            },
          },
        },
      }
    );
  }
}
