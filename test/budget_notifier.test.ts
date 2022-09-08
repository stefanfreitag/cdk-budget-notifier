import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';


import { BudgetNotifier } from '../src/budgetNotifier';
import { NotificationType } from '../src/notificationType';
import { TimeUnit } from '../src/timeUnit';

test('Budget with cost center and AZ filter', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    availabilityZones: ['eu-central-1'],
    costCenter: 'myCostCenter',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',

      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: ['user:Cost Center$myCostCenter'],
      },
    },
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Budget with application, AZ, and cost center filter', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    availabilityZones: ['eu-central-1'],
    application: 'HelloWorld',
    costCenter: 'myCostCenter',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',

      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: [
          'user:Application$HelloWorld',
          'user:Cost Center$myCostCenter',
        ],
      },
    },
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Budget for application and AZ filter', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    availabilityZones: ['eu-central-1'],
    application: 'HelloWorld',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',

      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: ['user:Application$HelloWorld'],
      },
    },
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Budget for application, AZ and service filter', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    application: 'HelloWorld',
    availabilityZones: ['eu-central-1'],
    service: 'Lambda',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',

      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: ['user:Application$HelloWorld', 'user:Service$Lambda'],
      },
    },
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Budget for multiple AZ', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    availabilityZones: ['eu-central-1', 'eu-west-1'],
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',

      CostFilters: {
        AZ: ['eu-central-1', 'eu-west-1'],
      },
    },
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Support for multiple subscribers', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar', 'sally.sixpack@foo.bar'],
    availabilityZones: ['eu-central-1'],
    application: 'HelloWorld',
    service: 'Lambda',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'ACTUAL',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
          {
            Address: 'sally.sixpack@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

describe('Threshold values', () => {
  test('Negative threshold is not allowed', () => {
    const stack = new Stack();

    expect(() => {
      new BudgetNotifier(stack, 'notifier', {
        recipients: ['john.doe@foo.bar'],
        availabilityZones: ['eu-central-1'],
        application: 'HelloWorld',
        limit: 10,
        unit: 'USD',
        threshold: -5,
      });
    }).toThrowError(/Thresholds less than or equal to 0 are not allowed./);
  });

});


test('Support for quarterly time unit', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar', 'sally.sixpack@foo.bar'],
    availabilityZones: ['eu-central-1'],
    application: 'HelloWorld',
    service: 'Lambda',
    limit: 10,
    unit: 'USD',
    threshold: 50,
    timeUnit: TimeUnit.QUARTERLY,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',
      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: ['user:Application$HelloWorld', 'user:Service$Lambda'],
      },
      TimeUnit: 'QUARTERLY',
    },
  });
});

test('Support for default time unit', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar', 'sally.sixpack@foo.bar'],
    availabilityZones: ['eu-central-1'],
    application: 'HelloWorld',
    service: 'Lambda',
    limit: 10,
    unit: 'USD',
    threshold: 50,
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    Budget: {
      BudgetLimit: {
        Amount: 10,
        Unit: 'USD',
      },
      BudgetType: 'COST',
      CostFilters: {
        AZ: ['eu-central-1'],
        TagKeyValue: ['user:Application$HelloWorld', 'user:Service$Lambda'],
      },
      TimeUnit: 'MONTHLY',
    },
  });
});

test('Support for notification type FORECASTED', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    recipients: ['john.doe@foo.bar'],
    availabilityZones: ['eu-central-1'],
    costCenter: 'myCostCenter',
    limit: 10,
    unit: 'USD',
    threshold: 50,
    notificationType: NotificationType.FORECASTED,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: 'FORECASTED',
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'john.doe@foo.bar',
            SubscriptionType: 'EMAIL',
          },
        ],
      },
    ],
  });
});

test('Exceeding maximum number of mail recipients gives an error', () => {
  const stack = new Stack();

  expect(() => {
    new BudgetNotifier(stack, 'notifier', {
      recipients: [
        '1john.doe@foo.bar',
        '2john.doe@foo.bar',
        '3john.doe@foo.bar',
        '4john.doe@foo.bar',
        '5john.doe@foo.bar',
        '6john.doe@foo.bar',
        '7john.doe@foo.bar',
        '8john.doe@foo.bar',
        '9john.doe@foo.bar',
        '10john.doe@foo.bar',
        '11john.doe@foo.bar',
      ],
      availabilityZones: ['eu-central-1'],
      application: 'HelloWorld',
      limit: 10,
      unit: 'USD',
      threshold: -5,
    });
  }).toThrowError(/The maximum number of 10 e-mail recipients is exceeded./);
});

test('SNS topic is set up', () => {
  const stack = new Stack();

  new BudgetNotifier(stack, 'notifier', {
    topicArn: 'sns-topic',
    availabilityZones: ['eu-central-1'],
    costCenter: 'myCostCenter',
    limit: 10,
    unit: 'USD',
    threshold: 50,
    notificationType: NotificationType.FORECASTED,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Budgets::Budget', {
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: 'GREATER_THAN',
          NotificationType: NotificationType.FORECASTED,
          Threshold: 50,
          ThresholdType: 'PERCENTAGE',
        },
        Subscribers: [
          {
            Address: 'sns-topic',
            SubscriptionType: 'SNS',
          },
        ],
      },
    ],
  });
});