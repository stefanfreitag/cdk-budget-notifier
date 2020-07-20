import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
import { StackProps } from "@aws-cdk/core";

export interface BudgetNotifierProps extends StackProps {
  /**
   * Budget notifications will be sent to each of the recipients (e-mail addresses).
   */
  readonly recipients: Array<string>;

  /**
   * If specified the availability zones will be added as tag filter.
   */
  readonly availabilityZones?: Array<string>;
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

    if (props.threshold <= 0) {
      throw new Error("Thresholds less than or equal to 0 are not allowed.");
    }

    const costFilters = this.createCostFilters(props);
    const subscribers = this.createSubscribers(props);

    const budget = new CfnBudget(this, "OverallMonthlyBudget", {
      budget: {
        budgetType: "COST",
        timeUnit: "MONTHLY",
        budgetLimit: {
          amount: props.limit,
          unit: props.unit,
        },
        costFilters: costFilters,
      },
      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: "GREATER_THAN",
            threshold: props.threshold,
            thresholdType: "PERCENTAGE",
            notificationType: "ACTUAL",
          },
          subscribers: subscribers,
        },
      ],
    });
  }

  private createSubscribers(props: BudgetNotifierProps) {
    const subscribers = new Array<CfnBudget.SubscriberProperty>();

    for (const recipient of props.recipients) {
      subscribers.push({
        address: recipient,
        subscriptionType: "EMAIL",
      });
    }
    return subscribers;
  }

  private createCostFilters(props: BudgetNotifierProps) {
    const tags: Array<string> = [];
    if (props.application) {
      tags.push("user:Application$" + props.application);
    }

    if (props.costCenter) {
      tags.push("user:Cost Center$" + props.costCenter);
    }

    if (props.service) {
      tags.push("user:Service$" + props.service);
    }

    const costFilters: any = {};

    if (tags) {
      costFilters["TagKeyValue"] = tags;
    }
    const availabilityZones: Array<string> = [];
    if (props.availabilityZones) {
      for (const az of props.availabilityZones) {
        availabilityZones.push(az);
      }
      costFilters["AZ"] = availabilityZones;
    }
    return costFilters;
  }
}
