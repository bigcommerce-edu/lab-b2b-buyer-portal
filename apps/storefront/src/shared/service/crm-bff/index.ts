import crmClient from './client';

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
  const response = await crmClient.post<FetchTokenResponse, FetchTokenPayload>({
    path: '/storefrontToken',
    payload: {
      b2bToken,
      b2bCompanyId,
      storeHash,
    },
  });
  return response.token;
};

interface FetchOrderSupportCasesQueryParams {
  b2bOrderIds: string[];
}

interface FetchOrderSupportCasesResponse {
  cases: {
    id: string;
    b2bOrderId: string;
    status: string;
  }[];
}

const fetchOrderSupportCases = async({
  token,
  filters,
}: {
  token: string;
  filters: FetchOrderSupportCasesQueryParams;
}) => {
  const response = await crmClient.get<FetchOrderSupportCasesResponse, FetchOrderSupportCasesQueryParams>({
    path: `/company/orderCases`,
    token,
    options: {
      queryParams: {
        ...filters,
      }
    },
  });
  return response.cases;
};

export {
  fetchStorefrontToken,
  fetchOrderSupportCases,
};
