#  AWS Budget Notifier

Setup AWS Budget notifications using AWS CDK.
By default notifications are sent via e-mail.


## Configuration options

- Budget
  - `limit`: The budget limit
  - `unit`: The unit of measurement for the limit, e.g. USD.
- Cost Filters
  - `application`: If specified the application (name) will be added as tag filter.
  - `costcenter`: If specified the cost center will be added as tag filter.
  - `service`: If specified the service (e.g. Lambda, EC2)will be added as tag filter.
- Notification
  - `recipient`: Notifications are sent to this e-mail address
  - `threshold`:  Notifications are triggered if `treshold` percent of the budget are exceeded.

## Example

```json
{
   recipient: "stefan@stefreitag.de",
   application: "HelloWorld",
   costCenter: "myCostCenter",
   limit: 10,
   unit: "USD"
 }
```