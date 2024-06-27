import { Duration, Stack } from "aws-cdk-lib";
import {
  AwsIntegration,
  IntegrationOptions,
  IntegrationResponse,
  PassthroughBehavior,
} from "aws-cdk-lib/aws-apigateway";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import {
  sqsRequestTemplate,
  sqsResponseTemplate,
} from "../templates/sqs.template";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

export class SQSConstruct extends Construct {
  private _env: string | undefined = this.node.getContext("env") || "dev";
  private _queue: Queue;
  private _role: Role;
  private _integration: AwsIntegration;
  
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this._queue = new Queue(this, id, {
      queueName: `solaris-submit-score-${this._env}.fifo`,
      fifo: true,
      contentBasedDeduplication: true,
      visibilityTimeout: Duration.seconds(30),
    });

    this._role = this.addRole();
    this._integration = this.addIntegration();

    this.sqs.grantSendMessages(this._role);

    this.addLambdaTrigger();
  }

  private addRole() {
    const role = new Role(this, `SolarisAPIGWtoSQSSubmitScoreRole`, {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
      roleName: `SolarisAPIGWtoSQSSubmitScoreRole-${this._env}`,
    });

    role.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("AmazonSQSFullAccess")
    );

    return role;
  }

  private addIntegration() {
    const integrationResponse: IntegrationResponse = {
      statusCode: "200",
      responseTemplates: {
        "application/json": sqsResponseTemplate,
      },
    };

    const integrationOptions: IntegrationOptions = {
      credentialsRole: this._role,
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestParameters: {
        "integration.request.header.Content-Type":
          "'application/x-www-form-urlencoded'",
      },
      requestTemplates: {
        "application/json": sqsRequestTemplate,
      },
      integrationResponses: [integrationResponse],
    };

    return new AwsIntegration({
      service: "sqs",
      path: `${Stack.of(this).account}/${this._queue.queueName}`,
      integrationHttpMethod: "POST",
      options: integrationOptions,
    });
  }

  private addLambdaTrigger() {
    const lambdaFunction = new Function(
      this,
      `solaris-submit-score-trigger-${this._env}`,
      {
        runtime: Runtime.NODEJS_20_X,
        handler: "submit-score.handler",
        functionName: `solaris-sqs-submit-score-trigger-${this._env}`,
        code: Code.fromAsset("lambda/sqs/dist"),
        environment: {
          MONGODB_URI: process.env.MONGODB_URI || "",
          MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
          ABLY_KEY: process.env.ABLY_KEY || "",
        },
      }
    );

    const eventSource = new SqsEventSource(this._queue);

    lambdaFunction.addEventSource(eventSource);
  }

  public get sqs(): Queue {
    return this._queue;
  }

  public get role(): Role {
    return this._role;
  }

  public get Integration(): AwsIntegration {
    return this._integration;
  }
}
