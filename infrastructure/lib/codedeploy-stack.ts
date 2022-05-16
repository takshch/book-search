import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServerApplication, ServerDeploymentGroup, InstanceTagSet, ServerDeploymentConfig } from 'aws-cdk-lib/aws-codedeploy';
import { EC2_TAG_NAME } from '../bin/infrastructure';
import { EC2_TAG_VALUE } from '../bin/infrastructure';

export class CodeDeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const app = new ServerApplication(this, 'codedeploy-app', {
      applicationName: 'book-search-codedeploy',
    });

    new ServerDeploymentGroup(this, 'book-search-dg', {
      application: app,
      deploymentGroupName: 'book-search-dg',
      deploymentConfig: ServerDeploymentConfig.ALL_AT_ONCE,
      ec2InstanceTags: new InstanceTagSet({
        [EC2_TAG_NAME]: [EC2_TAG_VALUE]
      }),
    });
  }
}
