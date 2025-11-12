import B3Request from "@/shared/service/request/b3Fetch";
import { ShoppingListStatus } from "@/types/shoppingList";

export interface OverviewShoppingList {
  id: string;
  name: string;
  status: string;
  customerInfo: {
    firstName: string;
    lastName: string;
  };
  updatedAt: number;
}

export interface OverviewOrder {
  orderId: string;
  createdAt: number;
  totalIncTax: number;
  poNumber: string;
}

export interface OverviewQuote {
  id: string;
  createdAt: number;
  updatedAt: number;
  quoteNumber: string;
  quoteTitle: string;
  createdBy: string;
  totalAmount: string;
}

export interface OverviewInvoice {
  id: string;
  createdAt: number;
  invoiceNumber: string;
  dueDate: number;
  orderNumber: string;
  status: number;
  openBalance: {
    code: string;
    value: string;
  }
  originalBalance: {
    code: string;
    value: string;
  }
}

interface RecentOrdersResponse {
  allOrders: {
    edges: {
      node: OverviewOrder;
    }[]
  }
}

interface RecentInvoicesResponse {
  invoices: {
    edges: {
      node: OverviewInvoice;
    }[]
  }
}

interface RecentShoppingListsResponse {
  shoppingLists: {
    edges: {
      node: OverviewShoppingList;
    }[]
  }
}

interface RecentQuotesResponse {
  quotes: {
    edges: {
      node: OverviewQuote;
    }[]
  }
}

const RecentOrdersQuery = `
  query GetRecentOrders(
    $limit: Int,
    $sort: String
  ) {
    allOrders(
      first: $limit,
      orderBy: $sort
    ){
      edges {
        node {
          orderId
          createdAt
          totalIncTax
          poNumber
        }
      }
    }
  }
`;

const RecentInvoicesQuery = `
  query GetRecentInvoices(
    $limit: Int,
    $sort: String
  ) {
    invoices (
      first: $limit,
      orderBy: $sort
    ){
      edges{
        node {
          id
          createdAt
          invoiceNumber
          dueDate
          orderNumber
          status
          openBalance {
            code
            value
          },
          originalBalance {
            code
            value
          },
        }
      }
    }
  }
`;

const RecentShoppingListsQuery = `
  query GetRecentShoppingLists(
    $limit: Int,
    $sort: String,
    $statuses: [Int]
  ) {
    shoppingLists (
      first: $limit,
      status: $statuses,
      orderBy: $sort
    ){
      edges{
        node{
          id
          name
          status
          customerInfo {
            firstName
            lastName
          }
          updatedAt
        }
      }
    }
  }
`;

const RecentQuotesQuery = `
  query GetRecentQuotes(
    $limit: Int,
    $sort: String,
    $status: Decimal
  ) {
    quotes (
      first: $limit,
      status: $status,
      orderBy: $sort
    ) {
      edges {
        node {
          id
          createdAt
          updatedAt
          quoteNumber
          quoteTitle
          createdBy
          totalAmount
        }
      }
    }
  }
`;

export const getRecentOrders = async () => {
  const resp = await B3Request.graphqlB2B({
    query: RecentOrdersQuery,
    variables: {
      limit: 5,
      sort: "-createdAt",
    },
  }) as RecentOrdersResponse;

  return resp.allOrders?.edges.map((edge) => edge.node) ?? [];
};

export const getRecentInvoices = async () => {
  const resp = await B3Request.graphqlB2B({
    query: RecentInvoicesQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
    },
  }) as RecentInvoicesResponse;

  return resp.invoices?.edges.map((edge) => edge.node) ?? [];
};

export const getRecentShoppingLists = async () => {
  const resp = await B3Request.graphqlB2B({
    query: RecentShoppingListsQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
      statuses: [ShoppingListStatus.Approved, ShoppingListStatus.Draft, ShoppingListStatus.ReadyForApproval],
    },
  }) as RecentShoppingListsResponse;

  return resp.shoppingLists?.edges.map((edge) => edge.node) ?? [];
};

export const getRecentQuotes = async () => {
  const resp = await B3Request.graphqlB2B({
    query: RecentQuotesQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
      status: 1,
    },
  }) as RecentQuotesResponse;

  return resp.quotes?.edges.map((edge) => edge.node) ?? [];
};
