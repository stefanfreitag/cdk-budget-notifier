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

### Example configuration

```json
{
   recipient: [ "stefan@stefreitag.de" ],
   threshold: 80,
   availabilityZones: [ "eu-central-1" ],
   application: "HelloWorld",
   costCenter: "myCostCenter",
   limit: 10,
   unit: "USD",
 }
```

## Installation

```shell
npm install
tsc -w
cdk deploy -profile <aws_profile>
```

## Links

- [Cost Explorer filters](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-filtering.html)