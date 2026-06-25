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

interface RecentInvoicesResponse {
  data: {
    invoices: {
      edges: {
        node: OverviewInvoice;
      }[]
    }
  }
}

interface RecentShoppingListsResponse {
  data: {
    shoppingLists: {
      edges: {
        node: OverviewShoppingList;
      }[]
    }
  }
}

interface RecentQuotesResponse {
  data: {
    quotes: {
      edges: {
        node: OverviewQuote;
      }[]
    }
  }
}

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

export const getRecentInvoices = async () => {
  const resp = await B3Request.graphqlB2B<RecentInvoicesResponse>({
    query: RecentInvoicesQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
    },
  });

  return resp.invoices?.edges.map((edge) => edge.node) ?? [];
};

export const getRecentShoppingLists = async () => {
  const resp = await B3Request.graphqlB2B<RecentShoppingListsResponse>({
    query: RecentShoppingListsQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
      statuses: [ShoppingListStatus.Approved, ShoppingListStatus.Draft, ShoppingListStatus.ReadyForApproval],
    },
  });

  return resp.shoppingLists?.edges.map((edge) => edge.node) ?? [];
};

export const getRecentQuotes = async () => {
  const resp = await B3Request.graphqlB2B<RecentQuotesResponse>({
    query: RecentQuotesQuery,
    variables: {
      limit: 5,
      sort: "-updatedAt",
      status: 1,
    },
  });

  return resp.quotes?.edges.map((edge) => edge.node) ?? [];
};
