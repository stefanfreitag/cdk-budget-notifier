import { NotificationType } from './notificationType';
import { TimeUnit } from './timeUnit';

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
