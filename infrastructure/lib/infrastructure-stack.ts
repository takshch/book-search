import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { CodeDeployStage } from './stages/codedeploy';
import { readFileSync } from 'fs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const defaultVpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true });

    const EC2_DYNAMODB_ROLE = new iam.Role(this, 'EC2_ROLE', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      description: 'EC2 instance with full DynamoDB access',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
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
      role: EC2_DYNAMODB_ROLE,
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

    const codePipeLine = new CodePipeline(this, 'PIPELINE', {
      pipelineName: 'BOOK_SEARCH',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('takshch/book-search', 'main'),
        commands: [],
        primaryOutputDirectory: 'infrastructure/cdk.out'
      }),
    });

    const deployStage = new CodeDeployStage(this, 'deploy-stage');
    codePipeLine.addStage(deployStage);
  }
}
