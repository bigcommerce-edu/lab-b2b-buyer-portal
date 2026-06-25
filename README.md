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
