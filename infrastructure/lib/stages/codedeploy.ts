import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeDeployStack } from '../codedeploy-stack';

export class CodeDeployStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new CodeDeployStack(this, 'CodeDeployStack');
  }
}
