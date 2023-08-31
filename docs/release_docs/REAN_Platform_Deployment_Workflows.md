# REAN Platform Deployment Workflows

## PR-CI-CD

**Mode of Trigger:** Automated

The PR Workflow is triggered automatically whenever a Pull Request with a source branch as a `feature/*` branch is created against the target branch as the `develop` branch.

### PR Workflow Diagram
![PR-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/pr-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![pr](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Pr-ci-cd_example.png?raw=true)

### Jobs

The PR workflow employs two jobs:

#### CodeScan-ESLint
In this job, we analyze the code that the developer wrote against certain rules to identify any stylistic or programmatic errors.
* This job uses the [Super-linter](https://github.com/marketplace/actions/super-linter) action.
* It utilizes a static code analysis tool to detect problematic patterns within the application's source code.

#### Build-Docker-Image
In this job, we validate the Dockerfile and test the image build process to uncover any issues arising from recent code changes.
* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* It generates a Docker image with an image tag using the branch name and the short SHA of the commit, such as `feature/test_5e38e33`.

## Dev-CI-CD

**Mode of Trigger:** Automated

The Dev Workflow is automatically initiated whenever a Pull Request is merged into the `develop` branch. This workflow encompasses building the applications and deploying the changes to the RF Platform Development environment.

### Dev Workflow Diagram
![Dev-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/dev-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![dev](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Dev-ci-cd_example.png?raw=true)

### Jobs

#### Deploy-ECS
The Deploy ECS job encompasses the following steps:

* It utilizes [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* This job functions within the 'dev' environment and logs into ECR using credentials. It then constructs a new ECR Docker image with an image tag derived from the branch name and the short SHA of the commit. For instance, `/careplan-service-dev-uat:develop_5e38e33`.
* Subsequently, the job generates a fresh version of the Amazon ECS task definition, integrating the new Docker image. The deployment of the Amazon ECS task definition is orchestrated using the Duplo API.

## UAT-CI-CD

**Mode of Trigger:** Automated

The UAT-CI-CD workflow can be activated through two methods:

1. Creating a Pull Request to merge into the `MAIN` branch.
2. Initiating a Pull Request from a branch prefixed with 'release/'.

### UAT Workflow Diagram
![uat-ci-cd_Workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/uat-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![uat](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Uat-ci-cd_example.png?raw=true)

### Jobs

#### CodeScan-ESLint
The CodeScan ESLint job executes the following steps:

* It employs the [Super-linter](https://github.com/marketplace/actions/super-linter) action.
* Utilizing a static code analysis tool, this job identifies problematic patterns present in the application's source code.

#### Label_Checks
The Label Checks job performs the subsequent actions:

* It leverages [pull-request-label-checker](https://github.com/marketplace/actions/label-checker-for-pull-requests).
* Upon a Pull Request event, the job assesses whether the Pull Request bears one of the major, minor, or patch labels.

#### Deploy-ECS
The Deploy ECS job encompasses the ensuing steps:

* It employs [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* This job operates within the 'UAT' environment and authenticates to ECR using credentials. It proceeds to build a fresh ECR Docker image accompanied by an image tag derived from the branch name and the short SHA of the commit, such as `/careplan-service-dev-uat:develop_5e38e33`.
* Subsequently, the job generates a new version of the Amazon ECS task definition, incorporating the updated Docker image. The deployment of the Amazon ECS task definition is facilitated using the Duplo API.

## PROD-CI-CD

**Mode of Trigger:** Automated

The Prod Workflow is automatically initiated whenever a Pull Request is merged into the main branch. This workflow encompasses building the applications and deploying the changes to the RF Platform Production environment.

### Prod Workflow Diagram
![prod-ci-cd_Workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/PROD-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![prod](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/prod-ci-cd_example.png?raw=true)

### Jobs

#### Publish-Release
The Publish-Release job undertakes the ensuing actions:

* It utilizes [release-drafter](https://github.com/release-drafter/release-drafter).
* This job generates a new GitHub release, with the versioning based on the label assigned by the developer to the pull request.

#### Deploy-ECS
The Deploy-ECS job encompasses the following steps:

* It employs [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* This job authenticates to ECR using credentials and assembles a new ECR Docker image accompanied by an image tag based on the ID of the release generated by the Publish-Release job. For instance, `careplan-service-dev-uat:97777323`.
* Subsequently, the job produces a new version of the Amazon ECS task definition, integrating the updated Docker image. The deployment of the Amazon ECS task definition is facilitated using the Duplo API.
