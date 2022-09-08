#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { PolicyStatement, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Topic } from 'aws-cdk-lib/aws-sns';

import { BudgetNotifier } from './budgetNotifier';
import { NotificationType } from './notificationType';

const app = new App();
const stack = new Stack(app, 'BudgetNotifierStack');

const topic = new Topic(stack, 'topic');

const statement = new PolicyStatement({
  effect: Effect.ALLOW,
  principals: [new ServicePrincipal('budgets.amazonaws.com')],
  actions: ['SNS:Publish'],
  sid: 'Allow budget to publish to SNS',
  resources: [topic.topicArn],
});

topic.addToResourcePolicy(statement);

new BudgetNotifier(stack, 'notifier', {
  topicArn: topic.topicArn,
  availabilityZones: ['eu-central-1'],
  costCenter: 'MyCostCenter',
  limit: 10,
  unit: 'USD',
  threshold: 15,
  notificationType: NotificationType.FORECASTED,
});
