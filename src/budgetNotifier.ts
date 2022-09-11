import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { Construct } from 'constructs';
import { BudgetNotifierProps } from './budgetNotifierProps';
import { NotificationType } from './notificationType';
import { TimeUnit } from './timeUnit';

export class BudgetNotifier extends Construct {
  constructor(scope: Construct, id: string, props: BudgetNotifierProps) {
    super(scope, id);

    this.validateProperties(props);

    const costFilters = this.createCostFilters(props);
    const subscribers = this.createSubscribers(props);

    new CfnBudget(this, 'MonthlyBudget_' + id, {
      budget: {
        budgetType: 'COST',
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
            comparisonOperator: 'GREATER_THAN',
            threshold: props.threshold,
            thresholdType: 'PERCENTAGE',
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
        'The maximum number of 10 e-mail recipients is exceeded.',
      );
    }

    if (props.threshold <= 0) {
      throw new Error('Thresholds less than or equal to 0 are not allowed.');
    }
  }

  private createSubscribers(props: BudgetNotifierProps) {
    const subscribers = new Array<CfnBudget.SubscriberProperty>();
    if (props.recipients) {
      for (const recipient of props.recipients) {
        subscribers.push({
          address: recipient,
          subscriptionType: 'EMAIL',
        });
      }
    }
    if (props.topicArn) {
      subscribers.push({
        address: props.topicArn,
        subscriptionType: 'SNS',
      });
    }

    return subscribers;
  }

  private createCostFilters(props: BudgetNotifierProps) {
    const tags: Array<string> = [];
    if (props.application) {
      tags.push('user:Application$' + props.application);
    }

    if (props.costCenter) {
      tags.push('user:Cost Center$' + props.costCenter);
    }

    if (props.service) {
      tags.push('user:Service$' + props.service);
    }

    const costFilters: any = {};

    if (tags && tags.length>0) {
      costFilters.TagKeyValue = tags;
    }
    const availabilityZones: Array<string> = [];
    if (props.availabilityZones) {
      for (const az of props.availabilityZones) {
        availabilityZones.push(az);
      }
      costFilters.AZ = availabilityZones;
    }
    return costFilters;
  }
}
