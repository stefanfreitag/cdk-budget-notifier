# API Reference

**Classes**

Name|Description
----|-----------
[BudgetNotifier](#stefanfreitag-aws-budget-notifier-budgetnotifier)|*No description*


**Structs**

Name|Description
----|-----------
[BudgetNotifierProps](#stefanfreitag-aws-budget-notifier-budgetnotifierprops)|*No description*



## class BudgetNotifier 🔹 <a id="stefanfreitag-aws-budget-notifier-budgetnotifier"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BudgetNotifier(scope: Construct, id: string, props: BudgetNotifierProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BudgetNotifierProps](#stefanfreitag-aws-budget-notifier-budgetnotifierprops)</code>)  *No description*
  * **limit** (<code>number</code>)  The cost associated with the budget threshold. 
  * **recipients** (<code>Array<string></code>)  Budget notifications will be sent to each of the recipients (e-mail addresses). 
  * **threshold** (<code>number</code>)  The threshold value in percent (0-100). 
  * **unit** (<code>string</code>)  The unit of measurement that is used for the budget threshold, such as dollars or GB. 
  * **application** (<code>string</code>)  If specified the application name will be added as tag filter. __*Optional*__
  * **availabilityZones** (<code>Array<string></code>)  If specified the availability zones will be added as tag filter. __*Optional*__
  * **costCenter** (<code>string</code>)  If specified the cost center will be added as tag filter. __*Optional*__
  * **service** (<code>string</code>)  If specified the service will be added as tag filter. __*Optional*__




## struct BudgetNotifierProps 🔹 <a id="stefanfreitag-aws-budget-notifier-budgetnotifierprops"></a>






Name | Type | Description 
-----|------|-------------
**limit**🔹 | <code>number</code> | The cost associated with the budget threshold.
**recipients**🔹 | <code>Array<string></code> | Budget notifications will be sent to each of the recipients (e-mail addresses).
**threshold**🔹 | <code>number</code> | The threshold value in percent (0-100).
**unit**🔹 | <code>string</code> | The unit of measurement that is used for the budget threshold, such as dollars or GB.
**application**?🔹 | <code>string</code> | If specified the application name will be added as tag filter.<br/>__*Optional*__
**availabilityZones**?🔹 | <code>Array<string></code> | If specified the availability zones will be added as tag filter.<br/>__*Optional*__
**costCenter**?🔹 | <code>string</code> | If specified the cost center will be added as tag filter.<br/>__*Optional*__
**service**?🔹 | <code>string</code> | If specified the service will be added as tag filter.<br/>__*Optional*__



