import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APIGatewayConstruct } from "./constructs/api-gateway.construct";
import { SQSConstruct } from "./constructs/sqs.construct";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SolarisInfrastructureStack extends cdk.Stack {
  private _env: string | undefined = this.node.getContext("env") || "dev";

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apigwConstruct = new APIGatewayConstruct(
      this,
      `Solaris-APIGateway-${this._env})`
    );

    const sqsConstruct = new SQSConstruct(
      this,
      `Solaris-SQSSubmitScore-${this._env}`
    );

    apigwConstruct.attachSubmitScoreSQS(sqsConstruct.Integration);

    // The code that defines your stack goes here

    // example resource
    // const queueConstruct = new Queue(this, "InfrastructureQueue", {
    //   visibilityTimeout: cdk.Duration.seconds(300),
    //   fifo: true,
    // });
  }
}
