#!/usr/bin/env node
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { ServicePrincipal } from '@aws-cdk/aws-iam/lib/principals';
import { Topic } from '@aws-cdk/aws-sns';

import { App, Stack } from '@aws-cdk/core';
import { BudgetNotifier } from './budget_notifier';
import { NotificationType } from './NotificationType';

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
