#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BudgetNotifierStack } from '../lib/budget_notifier-stack';

const app = new cdk.App();
new BudgetNotifierStack(app, 'MonthlyBudgetNotifierStack', {
    recipient: "stefan@stefreitag.de",
    application: "HelloWorld",
    costCenter: "myCostCenter",
    limit: 10,
    unit: "USD"
});


new BudgetNotifierStack(app, 'BudgetNotifierStack', {
    recipient: "stefan@stefreitag.de",
    application: "HelloWorld",
    limit: 100,
    unit: "USD"
});
