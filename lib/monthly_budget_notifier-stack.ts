import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
export class MonthlyBudgetNotifierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CfnBudget(this, "OverallMonthlyBudget", {
      budget: {
        budgetType: "COST",
        timeUnit: "MONTHLY",
        budgetLimit: {
          amount: 10,
          unit: "EUR",
        },
        costFilters: [
        ]

      },
      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: "GREATER_THAN",
            threshold: 80,
            thresholdType: "PERCENTAGE",
            notificationType: "ACTUAL",
          },
          subscribers: [
            {
              address: "stefan@stefreitag.de",
              subscriptionType: "EMAIL",
            },
          ],
        },
      ],
    });
  }
}
