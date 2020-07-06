#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MonthlyBudgetNotifierStack } from '../lib/monthly_budget_notifier-stack';

const app = new cdk.App();
new MonthlyBudgetNotifierStack(app, 'MonthlyBudgetNotifierStack');
