import { expect as expectCDK, haveResourceLike } from "@aws-cdk/assert";
import { Stack } from "@aws-cdk/core";
import { BudgetNotifier } from "../lib/budget_notifier";

test("Budget with cost center and AZ filter", () => {
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
          AZ: ["eu-central-1", "eu-west-1"],
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
  const stack = new Stack();

  new BudgetNotifier(stack, "notifier", {
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
  const stack = new Stack();

  expect(() => {
    new BudgetNotifier(stack, "notifier", {
      recipients: ["john.doe@foo.bar"],
      availabilityZones: ["eu-central-1"],
      application: "HelloWorld",
      limit: 10,
      unit: "USD",
      threshold: -5,
    });
  }).toThrowError(/Thresholds less than or equal to 0 are not allowed./);
});
