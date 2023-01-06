const { awscdk } = require('projen');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'stefan.freitag@udo.edu',
  authorName: 'Stefan Freitag',
  description: 'A simple AWS budget notifier.',
  cdkVersion: '2.59.0',
  name: 'aws_budget_notifier',
  repository: 'https://github.com/stefanfreitag/cdk-budget-notifier.git',
  catalog: {
    twitter: 'stefanfreitag',
    announce: false,
  },
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.MONTHLY,
      secret: AUTOMATION_TOKEN,
    },
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

project.gitignore.addPatterns('.history/');
project.npmignore.addPatterns('.history/');


project.synth();