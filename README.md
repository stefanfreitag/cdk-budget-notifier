# AWS Budget Notifier

Setup AWS Budget notifications using AWS CDK.
By default notifications are sent to all subscribers via e-mail.

## Example usage

```javascript
import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
import { StackProps } from "@aws-cdk/core";
import { BudgetNotifier } from "./budget_notifier";

export class BudgetNotifierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new BudgetNotifier(this, "test", {
      recipients: ["john@doe.com"],
      availabilityZones: ["eu-central-1", "eu-west-1"],
      application: "HelloWorld",
      costCenter: "myCostCenter",
      limit: 10,
      unit: "USD",
      threshold: 75,
    });
  }
}
```

## Links

- [API documentation](./API.md)
- [AWS Cloud Development Kit (CDK)](https://github.com/aws/aws-cdk)
- [Cost Explorer filters](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-filtering.html)