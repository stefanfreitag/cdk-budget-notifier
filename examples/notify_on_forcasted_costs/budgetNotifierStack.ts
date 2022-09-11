#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { PolicyStatement, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Topic } from 'aws-cdk-lib/aws-sns';

import { BudgetNotifier } from '../../src/budgetNotifier';
import { NotificationType } from '../../src/notificationType';

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
  // Filter on the availability zone `eu-central-1`
  availabilityZones: ['eu-central-1'],
  costCenter: 'MyCostCenter',
  // Limit and unit defining the budget limit
  limit: 10,
  unit: 'USD',
  // When breaching the threshold of 85% of the 10 USD notifications will be send out.
  threshold: 85,
  notificationType: NotificationType.FORECASTED,
});
