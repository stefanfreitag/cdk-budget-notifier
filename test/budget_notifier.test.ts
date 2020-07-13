import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BudgetNotifier from '../lib/budget_notifier-stack';
import { BudgetNotifierStack } from '../lib/budget_notifier-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BudgetNotifierStack(app, 'MyTestStack', {
      recipient: "stefan@stefreitag.de",
      application: "HelloWorld",
      costCenter: "myCostCenter",
      limit: 10,
      unit: "USD"
    });
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
