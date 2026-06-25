# Changelog

All notable changes to this lab project are documented here. The version below is the **project version** (plain semver), tagged on the tip of the corresponding progressive history — it is independent of the base B2B Buyer Portal framework version.

## 1.0.0

Adopt the progressive-history structure.

- Split the two histories: `main` becomes a stable, append-only traditional branch; the tutorial-shaped commit chain is now an independent progressive history identified by the `1.0.0` project-version tag at its tip.
- Re-prefixed the legacy base-framework version tags (`v20260317064213-2`, `v20260317064213-3`, `v20260520032936`) as `framework-*` anchors, freeing the plain-semver namespace for project versions.
- Moved the lab step listing and diff links out of `README.md` into `docs/TUTORIAL.md`, which carries a "Based on version" banner. Fixed mislabeled `ERP`/`CRM` references while moving.
- Expanded `AGENTS.md` with the traditional-branch vs progressive-history terminology, the Git model and sync directions, the project-version / changelog / metadata conventions, the tag taxonomy, the strict 1:1 TODO → code rule, and a per-step lab breakdown.

Base framework: `bigcommerce/b2b-buyer-portal@20260520032936`.
