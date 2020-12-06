const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "stefan.freitag@udo.edu",
  authorName: "Stefan Freitag",
  description:"A simple AWS budget notifier.",
  cdkVersion: "1.76.0",
  name: "aws_budget_notifier",
  repository: "https://github.com/stefan.freitag/projen-budget-notifier.git",
  catalog:{
    twitter: 'stefanfreitag',
    announce: false
  },
  codeCov: true,
  dependabot: false,
  keywords: [
    "aws",
    "cdk",
    "budget"
  ],
  cdkDependencies: [
    "@aws-cdk/aws-budgets",
    "@aws-cdk/aws-iam",
    "@aws-cdk/aws-sns",
    "@aws-cdk/core"
  ],
  java: {
    javaPackage:"io.github.stefanfreitag.cdk.budgetnotifier",
    mavenArtifactId: "cdkBudgetNotifier",
    mavenGroupId: "io.github.stefanfreitag"
  },
  python:{
    module: "cdk_budget_notifier",
    distName: "cdk-budget-notifier"
  }


});

project.synth();
