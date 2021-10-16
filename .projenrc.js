const { AwsCdkConstructLibrary } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  authorAddress: 'stefan.freitag@udo.edu',
  authorName: 'Stefan Freitag',
  description: 'A simple AWS budget notifier.',
  cdkVersion: '1.128.0',
  name: 'aws_budget_notifier',
  repository: 'https://github.com/stefan.freitag/projen-budget-notifier.git',
  catalog: {
    twitter: 'stefanfreitag',
    announce: false,
  },
  defaultReleaseBranch: 'master',
  codeCov: true,
  dependabot: false,
  antitamper: false,
  keywords: [
    'aws',
    'cdk',
    'budget',
  ],
  cdkDependencies: [
    '@aws-cdk/aws-budgets',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-sns',
    '@aws-cdk/core',
  ],
  publishToMaven: {
    javaPackage: 'io.github.stefanfreitag.cdk.budgetnotifier',
    mavenArtifactId: 'cdkBudgetNotifier',
    mavenGroupId: 'io.github.stefanfreitag',
  },
  publishToPypi: {
    module: 'cdk_budget_notifier',
    distName: 'cdk-budget-notifier',
  },


});


project.synth();