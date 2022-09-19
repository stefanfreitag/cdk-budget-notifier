# AWS Budget Notifier

Setup a AWS Budget notification using AWS Cloud Development Kit (CDK).
The construct supports notifying to

- users via e-mail. Up to 10 e-mail addresses are supported
- an SNS topic  
  The SNS topic needs to exist and publishing to the topic needs to be allowed.

## Properties

[API.md](API.md)

## Example usages

### Notification on breaching forecasted cost

This example is handy for keeping control over your private AWS Bill.
For myself I aim to not spent more than 10 Euro / 10 USD per month and this alarm
reminds me.

```typescript
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
  // Filter on the availability zone `eu-central-1`
  availabilityZones: ["eu-central-1"],
  costCenter: "myCostCenter",
  // Limit and unit defining the budget limit
  limit: 10,
  unit: "USD",
  // When breaching the threshold of 85% of the 10 USD notifications will be send out.
  threshold: 85,
  notificationType: NotificationType.FORECASTED,
});

```

### Notification via e-Mail

As alternative to the notification via SNS you can specify a list of e-mail
recipients.

```typescript
const app = new cdk.App();
const stack = new Stack(app, "BudgetNotifierStack");

new BudgetNotifier(stack, 'notifier', {
  recipients: ['john.doe@foo.bar'],
  // Filter on the availability zone `eu-central-1`
  availabilityZones: ['eu-central-1'],
  costCenter: 'MyCostCenter',
  // Limit and unit defining the budget limit
  limit: 10,
  unit: 'USD',
  // When breaching the threshold of 85% of the 10 USD notifications will be send out.
  threshold: 85,
  notificationType: NotificationType.FORECASTED,
});
```

## Contributions

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dedominicisfa"><img src="https://avatars.githubusercontent.com/u/23100791?v=4" width="100px;" alt=""/><br /><sub><b>dedominicisfa</b></sub></a></td>
    <td align="center"><a href="http://p6m7g8.github.io"><img src="https://avatars.githubusercontent.com/u/34295?v=4" width="100px;" alt=""/><br /><sub><b>Philip M. Gollucci</b></sub></a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Links

- [AWS Cloud Development Kit (CDK)](https://github.com/aws/aws-cdk)
- [Cost Explorer filters](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-filtering.html)
