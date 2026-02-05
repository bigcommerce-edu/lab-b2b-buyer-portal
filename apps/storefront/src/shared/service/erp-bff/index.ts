import erpClient from './client';

interface FetchTokenPayload {
  b2bToken: string;
  b2bCompanyId: string;
  storeHash: string;
}

interface FetchTokenResponse {
  token: string;
}

const fetchStorefrontToken = async({
  b2bToken,
  b2bCompanyId,
  storeHash,
}: FetchTokenPayload) => {
  const response = await erpClient.post<FetchTokenResponse, FetchTokenPayload>({
    path: '/storefrontToken',
    payload: {
      b2bToken,
      b2bCompanyId,
      storeHash,
    },
  });
  return response.token;
};

interface FetchCompanyOrdersQueryParams {
  b2bOrderIds: string[];
}

interface FetchCompanyOrdersResponse {
  orders: {
    id: string;
    b2bOrderId: string;
    status: string;
  }[];
}

const fetchCompanyOrders = async({
  token,
  filters,
}: {
  token: string;
  filters: FetchCompanyOrdersQueryParams;
}) => {
  const response = await erpClient.get<FetchCompanyOrdersResponse, FetchCompanyOrdersQueryParams>({
    path: `/company/orders`,
    token,
    options: {
      queryParams: {
        ...filters,
      }
    },
  });
  return response.orders;
};

export {
  fetchStorefrontToken,
  fetchCompanyOrders,
};
