#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { BudgetNotifierStack } from "../lib/budget_notifier-stack";

const app = new cdk.App();
new BudgetNotifierStack(app, "BudgetNotifierStack", {
  recipients: ["stefan@stefreitag.de"],
  application: "HelloWorld",
  costCenter: "myCostCenter",
  limit: 10,
  unit: "USD",
  threshold: 50,
});
