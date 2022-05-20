import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeDeployServerDeployAction, GitHubSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { InstanceTagSet, ServerApplication, ServerDeploymentConfig, ServerDeploymentGroup } from 'aws-cdk-lib/aws-codedeploy';
import { EC2_TAG_NAME, EC2_TAG_VALUE } from '../bin/infrastructure';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const defaultVpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true });

    const EC2_ROLE = new iam.Role(this, 'EC2_ROLE', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      description: 'EC2 instance with full DynamoDB access',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployFullAccess'),
      ]
    });

    const EC2_SecurityGroup = new ec2.SecurityGroup(this, 'ec2-sg', {
      vpc: defaultVpc,
      allowAllOutbound: true,
      securityGroupName: 'ec2-sg',
    });

    EC2_SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access from the Internet'
    );

    EC2_SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP access from the Internet'
    );

    const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
      vpc: defaultVpc,
      role: EC2_ROLE,
      securityGroup: EC2_SecurityGroup,
      instanceName: 'ec2-instance',
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
    });

    const userDataScript = readFileSync('./lib/userData.sh', 'utf8');
    ec2Instance.addUserData(userDataScript);

    const app = new ServerApplication(this, 'codedeploy-app', {
      applicationName: 'book-search-cd',
    });

    const deploymentGroup = new ServerDeploymentGroup(this, 'book-search-dg', {
      application: app,
      deploymentGroupName: 'book-search-dg',
      deploymentConfig: ServerDeploymentConfig.ALL_AT_ONCE,
      ec2InstanceTags: new InstanceTagSet({
        [EC2_TAG_NAME]: [EC2_TAG_VALUE]
      }),
      installAgent: true,
    });

    const codePipeline = new Pipeline(this, 'PIPELINE', {
      pipelineName: 'BOOK_SEARCH',
    });

    // adds source stage and it's action
    const githubArtifact = new Artifact();

    const githubAction = new GitHubSourceAction({
      actionName: 'Github_Source',
      owner: 'takshch',
      repo: 'book-search',
      oauthToken: SecretValue.secretsManager('github-token'),
      output: githubArtifact,
      branch: 'main',
    });

    codePipeline.addStage({
      stageName: 'source',
      actions: [githubAction]
    });

    // adds deployment stage and it's action
    const deployAction = new CodeDeployServerDeployAction({
      actionName: 'Deploy',
      input: githubArtifact,
      deploymentGroup
    });

    codePipeline.addStage({
      stageName: 'deploy',
      actions: [deployAction]
    });
  }
}
