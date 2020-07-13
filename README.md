#  AWS Budget Notifier

Setup AWS Budget notifications using AWS CDK.
By default notifications are sent via e-mail.


## Configuration

Keys:

- recipient:
- application:
- costcenter:
- limit:
- unit:

Example of supported configuration keys:
```json
{
   recipient: "stefan@stefreitag.de",
   application: "HelloWorld",
   costCenter: "myCostCenter",
   limit: 10,
   unit: "USD"
 }
```