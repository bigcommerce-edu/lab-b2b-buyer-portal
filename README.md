# Custom BigCommerce B2B Buyer Portal

This project demonstrates core development techniques for customizing the BigCommerce B2B Buyer Portal.

Core concepts include:

* Routing
* Inspecting B2B user permissions
* Navigating within the Buyer Portal
* Material UI, custom B2B components, and theming
* Using the B2B GraphQL Storefront API
* Strategy for fetching third-party data

## Mock ERP Client

The project demonstrates a plausible workflow for making API requests to a third-party ERP.

To support this, the boilerplate includes a mock client to simulate these API requests. 

The mock client is for a "backend for frontend" service that proxies API requests using a storefront token.

The client supports an API request to perform a "token exchange" by validating the user's B2B storefront token and returning a signed token of its own.

Information on each mock request/response is logged to the browser console.

[See the mock API client here.](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/bp-mock-client-pre...bp-mock-client-post?diff=split)

## Labs

### Getting Started

Use the `start` Git tag to walk through code exercises step by step.

The following commnad uses `degit` to scaffold your local project from `start`:

```shell
npm install -g degit
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal#start <project-directory>
```

See the [B2B Buyer Portal documentation](https://developer.bigcommerce.com/b2b-edition/docs/buyer-portal/stencil) for the remaining steps to run and load your custom Buyer Portal into your Stencil storefront.

### Lab 1: Add an Overview Page

Add an Overview page with basic placeholder content.

[Completed Lab 1 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/route-post)

* Step 1 - Add an Overview page
  * [Step 1a - Permissions config](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-01a-pre...route-01a-post?diff=split)
  * [Step 1b - New route config](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-01b-pre...route-01b-post?diff=split)
* [Step 2 - Change default page](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-02-pre...route-02-post?diff=split)
* [Step 3 - Inspect permissions](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-03-pre...route-03-post?diff=split)
* [Step 4 - Navigate within Buyer Portal](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-04-pre...route-04-post?diff=split)

[Full Lab 1 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/route-pre...route-post?diff=split)

### Lab 2: Building Blocks

Utilize Material UI components and custom B2B components to build out Overview page content.

Fresh setup:

```shell
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal.git#comp-pre <directory-name>
```

[Completed Lab 2 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/comp-post)

* [Step 1 - Identity component](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/comp-01-pre...comp-01-post?diff=split)
* [Step 2 - Enhanced component with `styled`, icons, typography](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/comp-02-pre...comp-02-post?diff=split)
* [Step 3 - RecentOrders component](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/comp-03-pre...comp-03-post?diff=split)
* [Step 4 - Use Accordion](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/comp-04-pre...comp-04-post?diff=split)

[Full Lab 2 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/comp-pre...comp-post?diff=split)

### Lab 3: Theming

Add a custom font and use common techniques to customize the theme of Material UI components.

Fresh setup:

```shell
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal.git#theme-pre <directory-name>
```

[Completed Lab 3 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/theme-post)

* [Step 1 - Custom font and theme override](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/theme-01-pre...theme-01-post?diff=split)
* [Step 2 - More theming for typography and color](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/theme-02-pre...theme-02-post?diff=split)
* [Step 3 - Customize component defaults](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/theme-03-pre...theme-03-post?diff=split)

[Full Lab 3 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/theme-pre...theme-post?diff=split)

### Lab 4: Add Dynamic Data

Use built-in tools for making custom requests to the B2B GraphQL Storefront API.

Fresh setup:

```shell
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal.git#gql-pre <directory-name>
```

[Completed Lab 4 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/gql-post)

* Step 1 - Add real order data
  * [Step 1a - Add GraphQL](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/gql-01a-pre...gql-01a-post?diff=split)
  * [Step 1b - Use real data in RecentOrders](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/gql-01b-pre...gql-01b-post?diff=split)
* [Step 2 - Add other sections](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/gql-02-pre...gql-02-post?diff=split)

[Full Lab 4 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/gql-pre...gql-post?diff=split)

### Lab 5: Add a Redux Slice

Add a custom slice to the Redux global state.

Fresh setup:

```shell
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal.git#slice-pre <directory-name>
```

[Completed Lab 5 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/slice-post)

* [Step 1 - Create Redux slice](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/slice-01-pre...slice-01-post?diff=split)
* [Step 2 - Set and get state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/slice-02-pre...slice-02-post?diff=split)

[Full Lab 5 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/slice-pre...slice-post?diff=split)

### Lab 6: Simulate an ERP Integration

Using the mock API client, simulate a token exchange and integrate custom ERP data into recent orders.

Fresh setup:

```shell
degit https://github.com/bigcommerce-edu/lab-b2b-buyer-portal.git#erp-pre <directory-name>
```

[Completed Lab 6 state](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/tree/erp-post)

* [Step 1 - Perform token exchange](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/erp-01-pre...erp-01-post?diff=split)
* [Step 2 - Fetch ERP order data](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/erp-02-pre...erp-02-post?diff=split)
* [Step 3 - Add status column](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/erp-03-pre...erp-03-post?diff=split)

[Full Lab 6 diff](https://github.com/bigcommerce-edu/lab-b2b-buyer-portal/compare/erp-pre...erp-post?diff=split)
