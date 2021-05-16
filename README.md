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
