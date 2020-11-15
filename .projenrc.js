const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "stefan.freitag@udo.edu",
  authorName: "Stefan Freitag",
  description:"A simple AWS budget notifier.",
  cdkVersion: "1.73.0",
  name: "Aws_Budget_Notifier",
  repository: "https://github.com/stefan.freitag/projen-budget-notifier.git",
  catalog:{
    twitter: 'stefanfreitag',
    announce: false
  },
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
  ]
});

project.synth();
