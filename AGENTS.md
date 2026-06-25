# B2B Buyer Portal Example Lab Project

This is an example developer project demonstrating how to customize the BigCommerce B2B Buyer Portal.

## Terminology and Git Model

This repository maintains two kinds of history **separately**:

- **Traditional branch** (`main`): a normal Git branch with stable, append-only history. Custom-code changes are made on feature branches, reviewed via pull request, and merged here. `main`'s history is never rewritten.
- **Progressive history**: a tutorial-shaped commit chain (clean framework install → step commits → end metadata) that represents the step-by-step lab progression. It is rebuilt as an independent commit chain and identified by a **project-version tag** (plain semver) at its tip plus the step tags along it.

`main` and the latest progressive history have **different tip commits but identical file trees**. Every change must be replicated across both, using the `bcedu-lab-sync` skill, and verified with its `validate-sync` command:

- **Framework/dependency upgrades**: rebuild a new progressive history with `bcedu-lab-upgrade`, then `sync-to-main` (a reviewed PR) brings it onto `main`.
- **Custom lab-code changes**: make them on a branch off `main` and merge via PR, then `sync-to-progressive` folds them into a rebuilt progressive history.
- **Publishing** a progressive history (moving step tags + creating the project-version tip tag) is done with `bcedu-lab-publish`; it does **not** advance `main`.

## Project Version and Changelogs

- The **project version** (plain semver, separate from the B2B Buyer Portal framework version) is held in `package.json`'s `version` field and tagged on the tip of the corresponding progressive history.
- Each version has a changelog entry in `CHANGELOG.md`.
- **Metadata at the end**: the project-version bump and the addition of the changelog entry and tutorial docs are folded into the final commit(s) of each rebuilt progressive history (amended on each rebuild rather than accumulating new commits).
- The lab steps and GitHub diff links live in `docs/TUTORIAL.md`, which carries a "Based on version X" banner matching the latest progressive history.

## Tag Conventions

- **Project-version tag**: plain semver (e.g. `1.0.0`) at a progressive history's tip. Created fresh per history; never migrated.
- **Framework anchor**: `framework-<version>` (e.g. `framework-v20260520032936`) marks a base-framework release point. Permanent; never migrated.
- **Step tags**: `<prefix>-NN-pre` / `<prefix>-NN-post`, plus `<prefix>-pre` / `<prefix>-post` for each lab, and `start` / `complete` for the overall progression. Migrated onto a new history by the Main Tags publish.
- **eLearning tags**: `e-` prefixed. Migrated by the eLearning publish.

## Commit History Structure

- The first commit is a clean B2B Buyer Portal install.
- **Strict 1:1 TODO → code**: each commit that introduces `TODO:` comments should be immediately followed by the code commit that resolves them (one TODO commit per code commit). Avoid bundling many TODOs into a single early commit.

### Lab Exercises

| Exercise | Description | Tag Prefix |
| ------ | ----------- | ---------- |
| Pre-Lab Setup | Mock CRM Client Setup | `bp-mock-client` |
| Lab 1 | New Page/Route | `route` |
| Lab 2 | Component Architecture | `comp` |
| Lab 3 | Component Theming | `theme` |
| Lab 4 | Querying for BC Data | `gql` |
| Lab 5 | Create Redux Slice | `slice` |
| Lab 6 | Mock CRM Integration | `crm` |

### Lab Step Breakdown

Each step is a `<tag>-pre` (TODO placeholders) commit immediately followed by a `<tag>-post` (implementation) commit. eLearning state is represented by the same base tags in `e-<tag>-pre`/`e-<tag>-post` format. The overall progression starts at `start` and ends at `complete`.

**Pre-Lab Setup — Mock CRM Client Setup (`bp-mock-client`)**

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1 | `bp-mock-client` | Mock client implementation for generic CRM |

**Lab 1 — New Page/Route (`route`)** — start: `route-pre`, complete: `route-post`

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1a | `route-01a` | Add permissions config for Overview route |
| 1b | `route-01b` | Add router configuration for Overview route |
| 2 | `route-02` | Change Buyer Portal default page to Overview |
| 3 | `route-03` | Restrict rendering of recent orders info by permissions |
| 4 | `route-04` | Utilize useNavigate to navigate around Buyer Portal |

**Lab 2 — Component Architecture (`comp`)** — start: `comp-pre`, complete: `comp-post`

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1 | `comp-01` | Implement basic Identity component |
| 2 | `comp-02` | Enhance presentation of Identity component |
| 3 | `comp-03` | Basic RecentOrders component with mock data |
| 4 | `comp-04` | Wrap RecentOrders in Accordion component |

**Lab 3 — Component Theming (`theme`)** — start: `theme-pre`, complete: `theme-post`

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1 | `theme-01` | Add custom Material UI theme configuration |
| 2 | `theme-02` | Additional theme config |
| 3 | `theme-03` | Component-specific theme config |

**Lab 4 — Querying for BC Data (`gql`)** — start: `gql-pre`, complete: `gql-post`

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1a | `gql-01a` | Add GraphQL query for B2B recent orders data |
| 1b | `gql-01b` | Replace RecentOrders mock data with real order data |
| 2 | `gql-02` | Add sections for other recent records on Overview page |

**Lab 5 — Create Redux Slice (`slice`)** — start: `slice-pre`, complete: `slice-post`

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1 | `slice-01` | Create Redux slice to store CRM token in session state |
| 2 | `slice-02` | Test getting and setting CRM token in global state |

**Lab 6 — Mock CRM Integration (`crm`)** — start: `crm-pre`, complete: `crm-post` (= `complete`)

| Step | Tag Base | Description |
| ---- | --- | ----------- |
| 1 | `crm-01` | Perform CRM token exchange when Buyer Portal is initialized |
| 2 | `crm-02` | Fetch CRM case data in RecentOrders component |
| 3 | `crm-03` | Display CRM case status in RecentOrders grid |

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
