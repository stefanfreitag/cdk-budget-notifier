import * as cdk from "@aws-cdk/core";

import { CfnBudget } from "@aws-cdk/aws-budgets";
import { Construct } from "@aws-cdk/core";
import { NotificationType } from "./NotificationType";
import { TimeUnit } from "./TimeUnit";

/**
 * Configuration options of the {@link BudgetNotifier | BudgetNotifier}.
 */
export interface BudgetNotifierProps {
  /**
   * Budget notifications will be sent to each of the recipients (e-mail addresses).
   * A maximum of 10 recipients is allowed.
   */
  readonly recipients?: Array<string>;

  /*
   * Budget notifications will be sent to this SNS topic. The topic should already exist and needs to have the
   * correct resource policy setup (Allow service principal to SNS:Publish to the topic)
   */
  readonly topicArn?: string;
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
   * The length of time until a budget resets the actual and forecasted spend.
   * @see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-budgetdata.html#cfn-budgets-budget-budgetdata-timeunit
   */
  readonly timeUnit?: TimeUnit;
  /**
   * The cost associated with the budget threshold.
   */
  readonly limit: number;
  /**
   * The unit of measurement that is used for the budget threshold, such as dollars or GB.
   */
  readonly unit: string;
  /**
   * Whether the notification is for how much you have spent (ACTUAL) or for how much you're forecasted to spend (FORECASTED).
   * @see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-notification.html#cfn-budgets-budget-notification-notificationtype
   */
  readonly notificationType?: NotificationType;
}

export class BudgetNotifier extends Construct {
  constructor(scope: cdk.Construct, id: string, props: BudgetNotifierProps) {
    super(scope, id);

    this.validateProperties(props);

    const costFilters = this.createCostFilters(props);
    const subscribers = this.createSubscribers(props);

    new CfnBudget(this, "MonthlyBudget_" + id, {
      budget: {
        budgetType: "COST",
        timeUnit: props.timeUnit ? props.timeUnit : TimeUnit.MONTHLY,
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
            notificationType: props.notificationType
              ? props.notificationType
              : NotificationType.ACTUAL,
          },
          subscribers: subscribers,
        },
      ],
    });
  }

  private validateProperties(props: BudgetNotifierProps): void {
    if (props.recipients && props.recipients.length > 10) {
      throw new Error(
        "The maximum number of 10 e-mail recipients is exceeded."
      );
    }

    if (props.threshold <= 0) {
      throw new Error("Thresholds less than or equal to 0 are not allowed.");
    }
  }

  private createSubscribers(props: BudgetNotifierProps) {
    const subscribers = new Array<CfnBudget.SubscriberProperty>();
    if (props.recipients) {
      for (const recipient of props.recipients) {
        subscribers.push({
          address: recipient,
          subscriptionType: "EMAIL",
        });
      }
    }
    if (props.topicArn) {
      subscribers.push({
        address: props.topicArn,
        subscriptionType: "SNS",
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

    if (tags && tags.length>0) {
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
