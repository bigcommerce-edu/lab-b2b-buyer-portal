# B2B Buyer Portal Example Lab Project

This is an example developer project demonstrating how to customize the BigCommerce B2B Buyer Portal.

## Lab Steps and Commit History

The commit history of the repository is important and represents the steps of the developer labs. Each commit starting with the `start` tag demonstrates the code changes in a lab step.

## File Removal - Protected Paths

When creating a clean orphan branch, the following additional file paths should be protected from removal:

* `apps/storefront/.env`

## Framework Install Command

The base framework, or base application, is the B2B Buyer Portal. Clone the Buyer Portal from GitHub:

```
git clone git@github.com:bigcommerce/b2b-buyer-portal.git --branch <version>
```

If the user does not indicate a version to install, use the CLI command **without** the `--branch` option. If this is the case, try to capture the name of the latest tag in the source project repo and then include it in the base install's commit message in this project. For example: `bigcommerce/b2b-buyer-portal@20260317064213`

After re-installing the framework, make sure an appropriate version of Node.js is installed according to `.nvmrc` and use `yarn install` to install dependencies.

## Base Application AGENTS.md

This file only contains context about the nature of this repo as a lab project. `AGENTS-B2BBuyerPortal.md` contains the base application's original agent context. Read that file whenever general code changes are being made. It's not necessary to read the file when performing management of the lab project's commit history.
