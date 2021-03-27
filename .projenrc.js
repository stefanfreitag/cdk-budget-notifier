const { AwsCdkConstructLibrary } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  authorAddress: 'stefan.freitag@udo.edu',
  authorName: 'Stefan Freitag',
  description: 'A simple AWS budget notifier.',
  cdkVersion: '1.95.1',
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

// create a custom projen and yarn upgrade workflow
// source: https://github.com/aws-samples/amazon-eks-cicd-codebuild/blob/master/.projenrc.js
const workflow = project.github.addWorkflow('ProjenYarnUpgrade');

workflow.on({
  schedule: [{
    cron: '11 0 1 * *',
  }],
  workflow_dispatch: {}, // allow manual triggering
});

workflow.addJobs({
  upgrade: {
    'runs-on': 'ubuntu-latest',
    'steps': [
      { uses: 'actions/checkout@v2' },
      {
        uses: 'actions/setup-node@v1',
        with: {
          'node-version': '10.17.0',
        },
      },
      { run: 'yarn upgrade' },
      { run: 'yarn projen:upgrade' },
      // submit a PR
      {
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + AUTOMATION_TOKEN + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge',
        },
      },
    ],
  },
});

project.synth();