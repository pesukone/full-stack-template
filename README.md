> Create a new project from this template by running `taito template-create server-template`. You can also migrate an existing project to this template by running `taito template-migrate server-template` in your project root folder. Later you can upgrade your project to the latest version of the template by running `taito template-upgrade`. To ensure flawless upgrade, do not modify files that have **do not modify** note in them as they are designed to be reusable and easily configurable for various needs. In such case, improve the original files in the template instead, and then upgrade.

# server-template

## Prerequisites

* [taito-cli](https://github.com/TaitoUnited/taito-cli#readme)
* [docker-compose](https://docs.docker.com/compose/install/) (>= 1.11) or [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) (>= x.xx)
* eslint-plugin for your editor

## Conventions

* [Taito conventions:](https://github.com/TaitoUnited/taito/wiki/Conventions) General conventions
* [TaitoFlow:](https://github.com/TaitoUnited/taito/wiki/Git-and-GitHub#taitoflow) Version control workflow
* [Airbnb Style Guide:](https://github.com/airbnb/javascript) ES6 conventions

## Tips

* [Taito-cli](https://github.com/TaitoUnited/taito/wiki/Taito-cli)
* Original [project template](https://github.com/TaitoUnited/orig-template) that this project is based on.
* [Basic git commands](https://github.com/TaitoUnited/taito/wiki/Git-and-GitHub#git-commands)
* [Docker](https://github.com/TaitoUnited/taito/wiki/Docker)

## Development

Install linters locally (all developers use the same linter version):

    $ taito install

Start containers:

    $ taito start

Make sure that everything has been initialized (database populated, etc.):

    $ taito init

Open app in browser:

    $ taito open

Show user accounts that you can use to log in:

    $ taito users

Connect to local database:

    $ taito db-open

Stop:

    $ taito stop

For more commands run `taito help`. For troubleshooting run `taito trouble`. See PROJECT.md for project specific conventions and documentation.

> Basic authentication is enabled on non-production environments by default. The username is #username and the password is #password.

> It's common that idle applications are run down to save resources on non-production environments . If your application seems to be down, you can (re)start it by running `taito restart:ENV`, or by pushing some changes to git.

## Version Control

All commit messages should be structured according to the [Conventional Commits](http://conventionalcommits.org/) convention as application version number and release notes are generated automatically during release by the [semantic-release](https://github.com/semantic-release/semantic-release) library. You can edit autogenerated release notes afterwards in GitHub (e.g. combine some commits and clean up comments). Couple of commit message examples:

```
feat(dashboard): Added news on the dashboard.
```

```
fix(login): Fixed header alignment.

Problem persists with IE9, but IE9 is no longer supported.

Closes #87, #76
```

```
feat(ux): New look and feel

BREAKING CHANGE: Not really breaking anything, but it's a good time to
increase the major version number.
```

You can use any of the following types in your commit message. Use at least types `fix` and `feat`.

* `feat`: feature
* `fix`: bug fix
* `docs`: documentation
* `style`: code formatting
* `refactor`: refactoring
* `test`: implementing missing tests
* `chore`: maintenance

> TIP: Optionally you can use `npm run commit` to write your commit messages using commitizen, though often it is quicker to write commit messages by hand in code editor.

TODO some tips for keeping the commit history clean (link some article?)

## Database Migration

Add a new migration:

1. Add a new step to migration plan:

    `taito db-add NAME -r REQUIRES -n 'DESCRIPTION'`, for example:

    `taito db-add file.table -r user.table -r property.table -n 'Table for files'`

2. Modify database/deploy/xxx.sql, database/revert/xxx.sql and database/verify/xxx.sql

3. Deploy the change to your local db:

    `taito db-deploy`

CI/CD tool will deploy your database changes automatically to servers once you push your changes to git. Database migrations are executed using sqitch. More instructions on sqitch: [Sqitch tutorial](https://metacpan.org/pod/sqitchtutorial)

> It is recommended that you put a table name at the beginning of your migration script name. This way the table creation script and all its alteration scripts remain close to each other in the file hierarchy (high cohesion).

## Deployment

Deploying to different environments:

* dev: Push to dev branch.
* test: Merge changes to test branch. NOTE: Test environment is not mandatory.
* staging: Merge changes to staging branch. NOTE: Staging environment is not mandatory.
* prod: Merge changes to master branch. Version number and release notes are generated automatically by CI/CD tool.

Advanced features:

* **Feature branch**: You can create also an environment for a feature branch: Delete the old environment if it exists (`taito delete:feature`) and create new environment for your feature branch (`taito create:feature BRANCH`). Currently only one feature environment can exist at a time and therefore the old one needs to be deleted before new one is created.
* **Copy prod to staging**: Many times it's a good idea to copy production database to staging before merging changes to staging: `taito db-copy:prod staging`. If you are sure nobody is using the production database, you can alternatively use the quick copy (`taito db-copyquick:prod staging`), but it disconnects all other users connected to the production database until copying is finished.
* **Canary release**: Run `taito canary` and follow instructions. It will release the current staging version to production as a canary release. Canary release means that only a subset of users will be forwarded to the new release and most users will still use the old version. Afterwards you can do a full production release normally by merging changes to master.
* **Revert app**: Revert application to the previous revision by running `taito revert:ENV`. If you need to revert to a specific revision, check current revision by running `taito revision:ENV` first and then revert to a specific revision by running `taito revert:ENV REVISION`. NOTE: Command does not revert database changes.
* **Revert database changes**: Revert the previous migration batch by running `taito db-revert[:ENV]`. If you would like to revert to a specific revision instead, view the db change log first (`taito db-log[:ENV]`) and then run `taito db-revert[:ENV] CHANGE`.

NOTE: You might not have rights to execute some of the advanced operations (e.g. staging/production database operations). In such case, ask devops personnel to execute the operation for you.

## Tools

The following tools are currently used for this project. You can open any of the tools quickly from command line with taito-cli. Run `taito help` and see the links section provided by the link plugin.

* See issue boards on [GitHub projects](https://github.com/TaitoUnited/server-template/projects) and issues on [GitHub issues](https://github.com/TaitoUnited/server-template/issues).
* See all builds on [Google Build History](https://console.cloud.google.com/gcr/builds?project=gcloud-temp1&query=source.repo_source.repo_name%3D%22github-taitounited-server-template%22).
* See all build artifacts on [Google Container Registry](https://console.cloud.google.com/gcr/images/gcloud-temp1/EU/github-taitounited-server-template?project=gcloud-temp1).
* Deployed on Kubernetes. See  [instructions](https://github.com/TaitoUnited/taito/wiki/Kubernetes). The most common Kubernetes operations are available as taito commands: `taito help`.
*  All [dev](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-dev), [staging](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-staging) and [prod](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-prod) logs are gathered to Google Stackdriver. See [instructions](https://github.com/TaitoUnited/taito/wiki/Stackdriver).
* [Sentry](https://sentry.io/taitounited/server-template/) is used for error tracking. See [instructions](https://github.com/TaitoUnited/taito/wiki/Sentry).
* [Stackdriver uptime monitoring](https://app.google.stackdriver.com/uptime?project=gcloud-temp1) is used for monitoring production environment uptime status.
* See performance on: TODO new relic?
* See customer feedback: on TODO zendesk?

## Configuration

> Configuration is not required for local development and some of the steps require superuser rights.  For now, just modify docker-compose.yaml and run the application locally with Docker. Ask devops personnel to execute the rest of the configuration steps.

### Initial project configuration

1. Configure `taito-config.sh`
2. Run `taito config`

### Creating an environment

Execute the following steps for an environment (`feature`, `dev`, `test`, `staging` or `prod`):

1. Run `taito create:ENV` and follow instructions.
2. For production: configure `helm-prod.yaml`

### Upgrading to the latest version of the project template

Run `taito template-upgrade`. The command copies the latest versions of reusable Helm charts and CI/CD scripts to your project folder, and also this README.md file. You should not make project specific modifications to them as they are designed to be reusable and easily configurable for various needs. Improve the originals instead, and then upgrade.

### Kubernetes configuration

The `scripts/heml.yaml` file contains default Kubernetes settings for all environments and the `scripts/helm:ENV.yaml` files contain environment specific overrides for them. By Modying them you can easily configure environment variables, resource requirements and autoscaling for your containers.

If you want to change your stack in some way (e.g. add/remove cache or function), run `taito template-upgrade` and it will do it for you.
