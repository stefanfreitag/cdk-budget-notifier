# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BudgetNotifier <a name="BudgetNotifier" id="aws_budget_notifier.BudgetNotifier"></a>

#### Initializers <a name="Initializers" id="aws_budget_notifier.BudgetNotifier.Initializer"></a>

```typescript
import { BudgetNotifier } from 'aws_budget_notifier'

new BudgetNotifier(scope: Construct, id: string, props: BudgetNotifierProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws_budget_notifier.BudgetNotifier.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws_budget_notifier.BudgetNotifier.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws_budget_notifier.BudgetNotifier.Initializer.parameter.props">props</a></code> | <code><a href="#aws_budget_notifier.BudgetNotifierProps">BudgetNotifierProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws_budget_notifier.BudgetNotifier.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws_budget_notifier.BudgetNotifier.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws_budget_notifier.BudgetNotifier.Initializer.parameter.props"></a>

- *Type:* <a href="#aws_budget_notifier.BudgetNotifierProps">BudgetNotifierProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws_budget_notifier.BudgetNotifier.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="aws_budget_notifier.BudgetNotifier.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws_budget_notifier.BudgetNotifier.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="aws_budget_notifier.BudgetNotifier.isConstruct"></a>

```typescript
import { BudgetNotifier } from 'aws_budget_notifier'

BudgetNotifier.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="aws_budget_notifier.BudgetNotifier.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws_budget_notifier.BudgetNotifier.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws_budget_notifier.BudgetNotifier.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BudgetNotifierProps <a name="BudgetNotifierProps" id="aws_budget_notifier.BudgetNotifierProps"></a>

Configuration options of the {@link BudgetNotifier BudgetNotifier}.

#### Initializer <a name="Initializer" id="aws_budget_notifier.BudgetNotifierProps.Initializer"></a>

```typescript
import { BudgetNotifierProps } from 'aws_budget_notifier'

const budgetNotifierProps: BudgetNotifierProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.limit">limit</a></code> | <code>number</code> | The cost associated with the budget threshold. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.threshold">threshold</a></code> | <code>number</code> | The threshold value in percent (0-100). |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.unit">unit</a></code> | <code>string</code> | The unit of measurement that is used for the budget threshold, such as dollars or GB. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.application">application</a></code> | <code>string</code> | If specified the application name will be added as tag filter. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | If specified the availability zones will be added as tag filter. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.costCenter">costCenter</a></code> | <code>string</code> | If specified the cost center will be added as tag filter. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.notificationType">notificationType</a></code> | <code><a href="#aws_budget_notifier.NotificationType">NotificationType</a></code> | Whether the notification is for how much you have spent (ACTUAL) or for how much you're forecasted to spend (FORECASTED). |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.recipients">recipients</a></code> | <code>string[]</code> | Budget notifications will be sent to each of the recipients (e-mail addresses). |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.service">service</a></code> | <code>string</code> | If specified the service will be added as tag filter. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.timeUnit">timeUnit</a></code> | <code><a href="#aws_budget_notifier.TimeUnit">TimeUnit</a></code> | The length of time until a budget resets the actual and forecasted spend. |
| <code><a href="#aws_budget_notifier.BudgetNotifierProps.property.topicArn">topicArn</a></code> | <code>string</code> | *No description.* |

---

##### `limit`<sup>Required</sup> <a name="limit" id="aws_budget_notifier.BudgetNotifierProps.property.limit"></a>

```typescript
public readonly limit: number;
```

- *Type:* number

The cost associated with the budget threshold.

---

##### `threshold`<sup>Required</sup> <a name="threshold" id="aws_budget_notifier.BudgetNotifierProps.property.threshold"></a>

```typescript
public readonly threshold: number;
```

- *Type:* number

The threshold value in percent (0-100).

---

##### `unit`<sup>Required</sup> <a name="unit" id="aws_budget_notifier.BudgetNotifierProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of measurement that is used for the budget threshold, such as dollars or GB.

---

##### `application`<sup>Optional</sup> <a name="application" id="aws_budget_notifier.BudgetNotifierProps.property.application"></a>

```typescript
public readonly application: string;
```

- *Type:* string

If specified the application name will be added as tag filter.

---

##### `availabilityZones`<sup>Optional</sup> <a name="availabilityZones" id="aws_budget_notifier.BudgetNotifierProps.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

If specified the availability zones will be added as tag filter.

---

##### `costCenter`<sup>Optional</sup> <a name="costCenter" id="aws_budget_notifier.BudgetNotifierProps.property.costCenter"></a>

```typescript
public readonly costCenter: string;
```

- *Type:* string

If specified the cost center will be added as tag filter.

---

##### `notificationType`<sup>Optional</sup> <a name="notificationType" id="aws_budget_notifier.BudgetNotifierProps.property.notificationType"></a>

```typescript
public readonly notificationType: NotificationType;
```

- *Type:* <a href="#aws_budget_notifier.NotificationType">NotificationType</a>

Whether the notification is for how much you have spent (ACTUAL) or for how much you're forecasted to spend (FORECASTED).

> [http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-notification.html#cfn-budgets-budget-notification-notificationtype](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-notification.html#cfn-budgets-budget-notification-notificationtype)

---

##### `recipients`<sup>Optional</sup> <a name="recipients" id="aws_budget_notifier.BudgetNotifierProps.property.recipients"></a>

```typescript
public readonly recipients: string[];
```

- *Type:* string[]

Budget notifications will be sent to each of the recipients (e-mail addresses).

A maximum of 10 recipients is allowed.

---

##### `service`<sup>Optional</sup> <a name="service" id="aws_budget_notifier.BudgetNotifierProps.property.service"></a>

```typescript
public readonly service: string;
```

- *Type:* string

If specified the service will be added as tag filter.

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="aws_budget_notifier.BudgetNotifierProps.property.timeUnit"></a>

```typescript
public readonly timeUnit: TimeUnit;
```

- *Type:* <a href="#aws_budget_notifier.TimeUnit">TimeUnit</a>

The length of time until a budget resets the actual and forecasted spend.

> [http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-budgetdata.html#cfn-budgets-budget-budgetdata-timeunit](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-budgetdata.html#cfn-budgets-budget-budgetdata-timeunit)

---

##### `topicArn`<sup>Optional</sup> <a name="topicArn" id="aws_budget_notifier.BudgetNotifierProps.property.topicArn"></a>

```typescript
public readonly topicArn: string;
```

- *Type:* string

---



## Enums <a name="Enums" id="Enums"></a>

### NotificationType <a name="NotificationType" id="aws_budget_notifier.NotificationType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws_budget_notifier.NotificationType.ACTUAL">ACTUAL</a></code> | *No description.* |
| <code><a href="#aws_budget_notifier.NotificationType.FORECASTED">FORECASTED</a></code> | *No description.* |

---

##### `ACTUAL` <a name="ACTUAL" id="aws_budget_notifier.NotificationType.ACTUAL"></a>

---


##### `FORECASTED` <a name="FORECASTED" id="aws_budget_notifier.NotificationType.FORECASTED"></a>

---


### TimeUnit <a name="TimeUnit" id="aws_budget_notifier.TimeUnit"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws_budget_notifier.TimeUnit.MONTHLY">MONTHLY</a></code> | *No description.* |
| <code><a href="#aws_budget_notifier.TimeUnit.QUARTERLY">QUARTERLY</a></code> | *No description.* |
| <code><a href="#aws_budget_notifier.TimeUnit.ANNUALLY">ANNUALLY</a></code> | *No description.* |

---

##### `MONTHLY` <a name="MONTHLY" id="aws_budget_notifier.TimeUnit.MONTHLY"></a>

---


##### `QUARTERLY` <a name="QUARTERLY" id="aws_budget_notifier.TimeUnit.QUARTERLY"></a>

---


##### `ANNUALLY` <a name="ANNUALLY" id="aws_budget_notifier.TimeUnit.ANNUALLY"></a>

---

