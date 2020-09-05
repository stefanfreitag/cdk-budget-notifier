# AWS Budget Notifier

Setup a AWS Budget notification using AWS Cloud Development Kit (CDK).
The construct supports notifying to

- users via e-mail. Up to 10 e-mail addresses are supported
- an SNS topic<br>
  The SNS topic needs to exist and publishing to the topic needs to be allowed.

## Example usage in a CDK Stack

```javascript
const app = new cdk.App();
const stack = new Stack(app, "BudgetNotifierStack");

// Define the SNS topic and setup the resource policy
const topic = new Topic(stack, "topic");

const statement = new PolicyStatement({
  effect: Effect.ALLOW,
  principals: [new ServicePrincipal("budgets.amazonaws.com")],
  actions: ["SNS:Publish"],
  sid: "Allow budget to publish to SNS"
});
topic.addToResourcePolicy(statement);

// Setup the budget notifier and pass the ARN of the SNS topic
new BudgetNotifier(stack, "notifier", {
  topicArn: topic.topicArn,
  availabilityZones: ["eu-central-1"],
  costCenter: "myCostCenter",
  limit: 10,
  unit: "USD",
  threshold: 15,
  notificationType: NotificationType.FORECASTED,
});

```

## Links

- [AWS Cloud Development Kit (CDK)](https://github.com/aws/aws-cdk)
- [Cost Explorer filters](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-filtering.html)