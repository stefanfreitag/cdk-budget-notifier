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

test("Budget with cost center and AZ filter", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar"],
    availabilityZones: ["eu-central-1"],
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
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Budget with application, AZ, and cost center filter", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar"],
    availabilityZones: ["eu-central-1"],
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
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Budget for application and AZ filter", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar"],
    availabilityZones: ["eu-central-1"],
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
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});

test("Budget for application, AZ and service filter", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar"],
    application: "HelloWorld",
    availabilityZones: ["eu-central-1"],
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
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});


test("Budget for multiple AZ", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar"],
    availabilityZones: ["eu-central-1", "eu-west-1"],
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
          AZ: ["eu-central-1", "eu-west-1"]          
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
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
          ],
        },
      ],
    })
  );
});



test("Support for multiple subscribers", () => {
  const app = new cdk.App();

  const stack = new BudgetNotifierStack(app, "MyTestStack", {
    recipients: ["john.doe@foo.bar", "sally.sixpack@foo.bar"],
    availabilityZones: ["eu-central-1"],
    application: "HelloWorld",
    service: "Lambda",
    limit: 10,
    unit: "USD",
    threshold: 50,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      NotificationsWithSubscribers: [
        {
          Subscribers: [
            {
              Address: "john.doe@foo.bar",
              SubscriptionType: "EMAIL",
            },
            {
              Address: "sally.sixpack@foo.bar",
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
      recipients: ["john.doe@foo.bar"],
      availabilityZones: ["eu-central-1"],
      application: "HelloWorld",
      limit: 10,
      unit: "USD",
      threshold: -5,
    });
  }).toThrowError(/Thresholds less than or equal to 0 are not allowed./);
});
