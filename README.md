#  AWS Budget Notifier

Setup AWS Budget notifications using AWS CDK.
By default notifications are sent to all subscribers via e-mail.


## Configuration options

- Budget
  - `limit`: The budget limit, e.g. 10.
  - `unit`: The unit of measurement for the limit, e.g. USD.
- Cost Filters<br/>

  | Key  | Description | 
  |---	|---	|
  | `application`	|  If specified the application (name) is added as tag filter. |
  | `availabilityZones` | If specified the availability zones (e.g. `eu-central-1`) is added as tag filter. |
  | `costcenter` 	| If specified the cost center is added as tag filter. |
  | `service`  	| If specified the service (e.g. Lambda, EC2) is added as tag filter. |

- Notification
  - `recipients`: Notifications are sent to this e-mail addresses
  - `threshold`:  Notifications are triggered if `threshold` percent of the budget are exceeded.

### Example usage

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

- [AWS Cloud Development Kit (CDK)](https://github.com/aws/aws-cdk)
- [Cost Explorer filters](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-filtering.html)