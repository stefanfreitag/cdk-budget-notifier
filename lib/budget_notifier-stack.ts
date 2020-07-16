import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
import { StackProps } from "@aws-cdk/core";

export interface BudgetNotifierProps extends StackProps {
  /**
   * Budget notifications will be sent to this e-mail address.
   */
  readonly recipient: string;

  /**
   * If specified the application name will be added as tag filter.
   */
  readonly application?: string;
  /**
   * If specified the cost center will be added as tag filter.
   */
  readonly costCenter?: string;

  /**
   * If specified the service will be added as tag filter.
   */
  readonly service?: string;
  /**
   * The threshold value in percent (0-100).
   */
  readonly threshold: number;
  /**
   * The cost associated with the budget threshold.
   */
  readonly limit: number;
  /**
   * The unit of measurement that is used for the budget threshold, such as dollars or GB.
   */
  readonly unit: string;
}

export class BudgetNotifierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BudgetNotifierProps) {
    super(scope, id, props);

    const tags: Array<string> = [];

    if (props.threshold <= 0) {
      throw new Error("Thresholds less than or equal to 0 are not allowed.");
    }

    if (props.application) {
      tags.push("user:Application$" + props.application);
    }

    if (props.costCenter) {
      tags.push("user:Cost Center$" + props.costCenter);
    }

    if (props.service) {
      tags.push("user:Service$" + props.service);
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
          TagKeyValue: tags,
        },
      },
      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: "GREATER_THAN",
            threshold: props.threshold,
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
