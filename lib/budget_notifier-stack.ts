import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
import { StackProps } from "@aws-cdk/core";

export interface BudgetNotifierProps extends StackProps {
  /**
   * Budget notifications will be sent to this e-mail address.
   */
  readonly recipient: string;

  readonly application?: string;

  readonly costCenter?: string;
  /**
   * 
   */
  readonly limit: number;
  readonly unit: string;
}

export class BudgetNotifierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BudgetNotifierProps) {
    super(scope, id, props);


    const tags: Array<string>= []
    //"user:Application$storm", "user:CostCenter$XYZ"

    if (props.application) {
      tags.push("user:Application$" + props.application)
    }
    
    if (props.costCenter) {
      tags.push("user:CostCenter$" + props.costCenter)
    }

    new CfnBudget(this, "OverallMonthlyBudget", {
      budget: {
        budgetType: "COST",
        timeUnit: "MONTHLY",
        budgetLimit: {
          amount: props.limit,
          unit: props.unit,
        },
        costFilters: {
          AZ: ["eu-central-1"],
          TagKeyValue: tags
        },
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
              address: props.recipient,
              subscriptionType: "EMAIL",
            },
          ],
        },
      ],
    });
  }
}
