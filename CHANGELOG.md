# Changelog

All notable changes to this lab project are documented here. The version below is the **project version** (plain semver), tagged on the tip of the corresponding progressive history — it is independent of the base B2B Buyer Portal framework version.

## 1.0.2

Upgrades the base framework and rebuilds the progressive history on top of it.

- Rebased the progressive history onto a clean install of `bigcommerce/b2b-buyer-portal@20261007000858` (previously `20260520032936`).
- Upgraded `jose` from 6.1.0 to 6.2.12.
- Aligned the lab's custom code with the Buyer Portal's own patterns:
  - Permission checks now read from the `rolePermissionSelector` Redux selector via `useAppSelector`, instead of calling `validatePermissionWithComparisonType`. The selector is reactive, so the Overview page re-renders when permissions change.
  - In-app navigation now uses React Router's `useNavigate` instead of the `setOpenPage` prop, which is the Buyer Portal's app-shell open/close mechanism rather than a navigation API.
  - GraphQL responses are typed with the `B3Request.graphqlB2B<T>` type parameter instead of `as` casts, so response shapes are checked rather than asserted.
- Renamed Lab 1 Step 4 from "Utilize setOpenPage to navigate around Buyer Portal" to "Utilize useNavigate to navigate around Buyer Portal" to match the pattern it now teaches.
- Corrected two TODO typos: `totalInclTax` → `totalIncTax` in Lab 2 Step 3, and the `erp` slice → `crm` slice in Lab 5 Step 1.

Base framework: `bigcommerce/b2b-buyer-portal@20261007000858`.

## 1.0.1

Restructures commit history to put all TODO comments immediately before the code that resolves them.

Base framework: `bigcommerce/b2b-buyer-portal@20260520032936`.

## 1.0.0

Adopt the progressive-history structure.

- Split the two histories: `main` becomes a stable, append-only traditional branch; the tutorial-shaped commit chain is now an independent progressive history identified by the `1.0.0` project-version tag at its tip.
- Re-prefixed the legacy base-framework version tags (`v20260317064213-2`, `v20260317064213-3`, `v20260520032936`) as `framework-*` anchors, freeing the plain-semver namespace for project versions.
- Moved the lab step listing and diff links out of `README.md` into `docs/TUTORIAL.md`, which carries a "Based on version" banner. Fixed mislabeled `ERP`/`CRM` references while moving.
- Expanded `AGENTS.md` with the traditional-branch vs progressive-history terminology, the Git model and sync directions, the project-version / changelog / metadata conventions, the tag taxonomy, the strict 1:1 TODO → code rule, and a per-step lab breakdown.

Base framework: `bigcommerce/b2b-buyer-portal@20260520032936`.
