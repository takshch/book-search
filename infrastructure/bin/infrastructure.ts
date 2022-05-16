#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

export const EC2_TAG_NAME = 'NAME';
export const EC2_TAG_VALUE = 'book-search-cdk';
const ENV = { account: '337452540769', region: 'us-east-1' };

const app = new cdk.App();
const STACK = new InfrastructureStack(app, 'InfrastructureStack', {
  env: ENV
});

// apply tags only on ec2 instance
cdk.Tags.of(STACK).add(EC2_TAG_NAME, EC2_TAG_VALUE, {
  includeResourceTypes: ['AWS::EC2::Instance']
});

app.synth();
