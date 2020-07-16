import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
  haveResource,
  haveResourceLike,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as BudgetNotifier from "../lib/budget_notifier-stack";
import { BudgetNotifierStack } from "../lib/budget_notifier-stack";

test("Single monthly budget for cost center", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipient: "stefan@stefreitag.de",
    costCenter: "myCostCenter",
    limit: 10,
    unit: "USD",
    threshold: 50,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      Budget: {
        BudgetLimit: {
          Amount: 10,
          Unit: "USD",
        },
        BudgetType: "COST",

        CostFilters: {
          AZ: ["eu-central-1"],
          TagKeyValue: ["user:Cost Center$myCostCenter"],
        },
      },
      NotificationsWithSubscribers: [
        {
          Notification: {
            ComparisonOperator: "GREATER_THAN",
            NotificationType: "ACTUAL",
            Threshold: 50,
            ThresholdType: "PERCENTAGE",
          },
          Subscribers: [
            {
              Address: "stefan@stefreitag.de",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Single monthly budget for application and cost center", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipient: "stefan@stefreitag.de",
    application: "HelloWorld",
    costCenter: "myCostCenter",
    limit: 10,
    unit: "USD",
    threshold: 50,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      Budget: {
        BudgetLimit: {
          Amount: 10,
          Unit: "USD",
        },
        BudgetType: "COST",

        CostFilters: {
          AZ: ["eu-central-1"],
          TagKeyValue: [
            "user:Application$HelloWorld",
            "user:Cost Center$myCostCenter",
          ],
        },
      },
      NotificationsWithSubscribers: [
        {
          Notification: {
            ComparisonOperator: "GREATER_THAN",
            NotificationType: "ACTUAL",
            Threshold: 50,
            ThresholdType: "PERCENTAGE",
          },
          Subscribers: [
            {
              Address: "stefan@stefreitag.de",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Single monthly budget for application", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipient: "stefan@stefreitag.de",
    application: "HelloWorld",
    limit: 10,
    unit: "USD",
    threshold: 50,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      Budget: {
        BudgetLimit: {
          Amount: 10,
          Unit: "USD",
        },
        BudgetType: "COST",

        CostFilters: {
          AZ: ["eu-central-1"],
          TagKeyValue: ["user:Application$HelloWorld"],
        },
      },
      NotificationsWithSubscribers: [
        {
          Notification: {
            ComparisonOperator: "GREATER_THAN",
            NotificationType: "ACTUAL",
            Threshold: 50,
            ThresholdType: "PERCENTAGE",
          },
          Subscribers: [
            {
              Address: "stefan@stefreitag.de",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Single monthly budget for application and service", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipient: "stefan@stefreitag.de",
    application: "HelloWorld",
    service: "Lambda",
    limit: 10,
    unit: "USD",
    threshold: 50,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      Budget: {
        BudgetLimit: {
          Amount: 10,
          Unit: "USD",
        },
        BudgetType: "COST",

        CostFilters: {
          AZ: ["eu-central-1"],
          TagKeyValue: ["user:Application$HelloWorld", "user:Service$Lambda"],
        },
      },
      NotificationsWithSubscribers: [
        {
          Notification: {
            ComparisonOperator: "GREATER_THAN",
            NotificationType: "ACTUAL",
            Threshold: 50,
            ThresholdType: "PERCENTAGE",
          },
          Subscribers: [
            {
              Address: "stefan@stefreitag.de",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Negative threshold is not allowed", () => {
  const app = new cdk.App();

  expect(() => {
    new BudgetNotifierStack(app, "MyTestStack", {
      recipient: "stefan@stefreitag.de",
      application: "HelloWorld",
      limit: 10,
      unit: "USD",
      threshold: -5,
    });
  }).toThrowError(/Thresholds less than or equal to 0 are not allowed./);
});
