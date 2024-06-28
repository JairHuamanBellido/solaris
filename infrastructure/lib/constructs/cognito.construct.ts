import { Duration, RemovalPolicy } from "aws-cdk-lib";
import {
  AccountRecovery,
  UserPool,
  UserPoolOperation,
} from "aws-cdk-lib/aws-cognito";
import { Code, Function, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class CognitoConstruct extends Construct {
  private _env: string | undefined = this.node.getContext("env") || "dev";
  private _userPool: UserPool;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._userPool = new UserPool(this, id, {
      userPoolName: `solaris-userpool-${this._env}`,
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      signInAliases: {
        username: true,
      },
      selfSignUpEnabled: true,
      standardAttributes: {
        givenName: { required: true },
        email: { required: true },
        preferredUsername: { required: true },
      },
      customAttributes: {},

      autoVerify: {
        email: false,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this._userPool.addClient(`solaris-cognito-client-${this._env}`, {
      userPoolClientName: `solaris-cognito-client-${this._env}`,
      oAuth: {
        flows: { authorizationCodeGrant: false, implicitCodeGrant: true },
      },
    });

    this._userPool.addDomain(`solaris-domain-cognito-${this._env}`, {
      cognitoDomain: {
        domainPrefix: `solaris-${this._env}`,
      },
    });

    /**
     * Lambda trigger
     */
    this.addAddLambdaTrigger(
      UserPoolOperation.PRE_SIGN_UP,
      this.preSignUpLambdaTrigger()
    );

    this.addAddLambdaTrigger(
      UserPoolOperation.POST_CONFIRMATION,
      this.postSignUpLambdaTrigger()
    );
  }

  public addAddLambdaTrigger(operation: UserPoolOperation, lambda: IFunction) {
    return this._userPool.addTrigger(operation, lambda);
  }

  private preSignUpLambdaTrigger(): Function {
    return new Function(this, `solaris-pre-signup-${this._env}`, {
      runtime: Runtime.NODEJS_20_X,
      handler: "pre-signup-trigger.handler",
      functionName: `solaris-pre-signup-trigger-${this._env}`,
      code: Code.fromAsset("lambda/cognito/dist"),
    });
  }

  private postSignUpLambdaTrigger(): Function {
    return new Function(this, `solaris-post-signup-${this._env}`, {
      runtime: Runtime.NODEJS_20_X,
      handler: "post-signup-trigger.handler",
      functionName: `solaris-post-signup-trigger-${this._env}`,
      code: Code.fromAsset("lambda/cognito/dist"),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
      },
    });
  }
}
